import { assert } from "chai";
import "mocha";
import { ProjectionStore } from "../../source/Core/ProjectionStore";
import { Subscriptions } from "../../source/Core/Subscriptions";
import { AllocationProjection } from "../../source/Projections/AllocationProjection";
import { LedgerProjection } from "../../source/Projections/LedgerProjection";
import { PlannedExpenseProjection } from "../../source/Projections/PlannedExpenseProjection";
import {
  PublishNewAccountSubmitted,
  PublishNewAllocation,
  PublishNewTransaction,
  RequestPlannedExpense,
} from "./Helpers";

const projectionStore = ProjectionStore.Instance;

describe("Scenarios", () => {

  describe("Features", () => {

    describe("Basic Usage", () => {
      let allocationProjections;
      let subscriptions;
      let ledger;
      it("Given all subscriptions are setup", () => {
        subscriptions = new Subscriptions();
        subscriptions.Create();
      });
      it("When a NewAccountSubmitted event is published", () => {
        PublishNewAccountSubmitted();
      });
      it("Then a Ledger should be created", () => {
        ledger = projectionStore.GetProjections(LedgerProjection)[0];
        assert.exists(ledger);
      });
      it("And the ledger should have a zero balance", () => {
        assert.isTrue(ledger.Balance === 0);
      });
      it("When a $1 withdrawal transaction is created;", () => {
        PublishNewTransaction(1);
      });
      it("Then the Ledger balance should be -1", () => {
        assert.equal(ledger.Balance, -1);
      });
      it("When another $1 withdrawal transaction is created;", () => {
        PublishNewTransaction(1);
      });
      it("Then the Ledger balance should be -2", () => {
        assert.equal(ledger.Balance, -2);
      });
      it("When another $1 withdrawal transaction is created;", () => {
        PublishNewTransaction(1);
      });
      it("Then the Ledger balance should be -3", () => {
        assert.equal(ledger.Balance, -3);
      });
      it("When another $1 withdrawal transaction is created;", () => {
        PublishNewTransaction(1);
      });
      it("Then the Ledger balance should be -4", () => {
        assert.equal(ledger.Balance, -4);
      });
      it("When another $1 withdrawal transaction is created;", () => {
        PublishNewTransaction(1);
      });
      it("Then the Ledger balance should be -5", () => {
        assert.equal(ledger.Balance, -5);
      });
      it("When a new $10 Allocation is made to the Ledger", () => {
        PublishNewAllocation(ledger.Id, -10);
      });
      it("Then the Ledger balance should be 5", () => {
        assert.equal(ledger.Balance, 5);
      });
      it("And the Ledger should be linked to 6 Transactions", () => {
        assert.equal(ledger.TransactionIds.length, 6);
      });
      it("And the Allocation should have been created", () => {
        allocationProjections = projectionStore.GetProjections(AllocationProjection);
        assert.equal(allocationProjections.length, 1);
      });
      it("And the Allocation should be linked to the Ledger", () => {
        assert.equal(allocationProjections[0].LedgerId, ledger.Id);
      });
      it("When a new Planned Expense is requested", () => {
        RequestPlannedExpense();
      });
      it("Then a new PlannedExpenseProjection should exist", () => {
        const plannedExpense = projectionStore.GetProjections(PlannedExpenseProjection)[0];
        assert.exists(plannedExpense);
      });
    });

  });

});

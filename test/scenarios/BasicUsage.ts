import { assert } from "chai";
import "mocha";
import { ProjectionStore } from "../../source/Core/ProjectionStore";
import { Subscriptions } from "../../source/Core/Subscriptions";
import { AllocationProjection } from "../../source/Projections/AllocationProjection";
import { ExpenseProjection } from "../../source/Projections/ExpenseProjection";
import { LedgerProjection } from "../../source/Projections/LedgerProjection";
import { PayeeProjection } from "../../source/Projections/PayeeProjection";
import { PlannedExpenseProjection } from "../../source/Projections/PlannedExpenseProjection";
import { TransactionProjection } from "../../source/Projections/TransactionProjection";
import {
  PublishExpenseRequested,
  PublishNewAccountSubmitted,
  PublishNewAllocation,
  PublishNewTransaction,
  PublishPayeeRequested,
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
      it("And a new Transaction should exist.", () => {
        allocationProjections = projectionStore.GetProjections(TransactionProjection)[0];
        assert.exists(TransactionProjection);
      });
      it("When another $1 withdrawal transaction is created;", () => {
        PublishNewTransaction(1);
      });
      it("Then the Ledger balance should be -2", () => {
        assert.equal(ledger.Balance, -2);
      });
      it("And a new Transaction should exist.", () => {
        allocationProjections = projectionStore.GetProjections(TransactionProjection)[1];
        assert.exists(TransactionProjection);
      });
      it("When another $1 withdrawal transaction is created;", () => {
        PublishNewTransaction(1);
      });
      it("Then the Ledger balance should be -3", () => {
        assert.equal(ledger.Balance, -3);
      });
      it("And a new Transaction should exist.", () => {
        allocationProjections = projectionStore.GetProjections(TransactionProjection)[2];
        assert.exists(TransactionProjection);
      });
      it("When another $1 withdrawal transaction is created;", () => {
        PublishNewTransaction(1);
      });
      it("Then the Ledger balance should be -4", () => {
        assert.equal(ledger.Balance, -4);
      });
      it("And a new Transaction should exist.", () => {
        allocationProjections = projectionStore.GetProjections(TransactionProjection)[3];
        assert.exists(TransactionProjection);
      });
      it("When another $1 withdrawal transaction is created;", () => {
        PublishNewTransaction(1);
      });
      it("Then the Ledger balance should be -5", () => {
        assert.equal(ledger.Balance, -5);
      });
      it("And a new Transaction should exist.", () => {
        allocationProjections = projectionStore.GetProjections(TransactionProjection)[4];
        assert.exists(TransactionProjection);
      });
      it("When a new $10 Allocation is made to the Ledger", () => {
        PublishNewAllocation(ledger.Id, -10);
      });
      it("Then the Ledger balance should be 5", () => {
        assert.equal(ledger.Balance, 5);
      });
      it("And a new Transaction should exist.", () => {
        allocationProjections = projectionStore.GetProjections(TransactionProjection)[5];
        assert.exists(TransactionProjection);
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
      it("When an ExpenseRequested event is Published for 4", () => {
        PublishExpenseRequested(4, ledger.Id);
      });
      it("Then a new ExpenseProjection should exist", () => {
        const expenseProjection = projectionStore.GetProjections(ExpenseProjection)[0];
        assert.exists(expenseProjection);
      });
      it("And a new Transaction should exist", () => {
        const expenseProjection = projectionStore.GetProjections(ExpenseProjection)[0];
        const transaction = projectionStore.GetProjection(TransactionProjection, expenseProjection.TransactionId);
        assert.exists(transaction);
      });
      it("And the new Transaction should have an Amount of 4", () => {
        const expenseProjection = projectionStore.GetProjections(ExpenseProjection)[0];
        const transaction = projectionStore.GetProjection(TransactionProjection, expenseProjection.TransactionId);
        assert.isTrue(transaction.Amount === 4);
      });
      it("And the Ledger Balance should be 1", () => {
        assert.isTrue(ledger.Balance === 1);
      });
      it("When a PayeeRequested event is Published", () => {
        PublishPayeeRequested();
      });
      it("Then a new PayeeProjection should exist", () => {
        const payeeProjection = projectionStore.GetProjections(PayeeProjection);
        assert.exists(payeeProjection);
      });
    });
  });
});

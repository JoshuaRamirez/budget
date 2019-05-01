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

describe("CreateAllocationService", () => {

  it("smoke test passes", () => {
    const subscriptions = new Subscriptions();

    subscriptions.Create();
    PublishNewAccountSubmitted();
    const ledger = projectionStore.GetProjections(LedgerProjection)[0];
    PublishNewTransaction(1);
    assert.equal(ledger.Balance, -1);
    PublishNewTransaction(1);
    assert.equal(ledger.Balance, -2);
    PublishNewTransaction(1);
    assert.equal(ledger.Balance, -3);
    PublishNewTransaction(1);
    assert.equal(ledger.Balance, -4);
    PublishNewTransaction(1);
    assert.equal(ledger.Balance, -5);
    PublishNewAllocation(ledger.Id, -10);
    const allocationProjections = projectionStore.GetProjections(AllocationProjection);
    assert.equal(ledger.Balance, 5);
    assert.equal(allocationProjections.length, 1);
    assert.equal(allocationProjections[0].LedgerId, ledger.Id);
    RequestPlannedExpense();
    const plannedExpense = projectionStore.GetProjections(PlannedExpenseProjection)[0];
    assert.exists(plannedExpense);
    assert.equal(ledger.TransactionIds.length, 6);
  });

});

import { assert } from "chai";
import "mocha";
import { ProjectionStore } from "../../../../source/Core/ProjectionStore";
import { Subscriptions } from "../../../../source/Core/Subscriptions";
import { AllocationRequestedEvent } from "../../../../source/Events/AllocationRequestedEvent";
import { ExpenseRequestedEvent } from "../../../../source/Events/ExpenseRequestedEvent";
import { TransactionCreatedEvent } from "../../../../source/Events/TransactionCreatedEvent";
import { LedgerProjection } from "../../../../source/Projections/LedgerProjection";
import { TransactionProjection } from "../../../../source/Projections/TransactionProjection";
import { CreateAllocationSaga } from "../../../../source/Sagas/CreateAllocationSaga";
import { CreateExpenseSaga } from "../../../../source/Sagas/CreateExpenseSaga";
import { UpdateLedgerBalanceService } from "../../../../source/Services/Updates/UpdateLedgerBalanceService";


describe("UpdateLedgerBalanceService", () => {
  beforeEach(() => {
    Subscriptions.Release();
    ProjectionStore.Instance.ClearAll();
  });
  it("should update projection with allocation", () => {
    const service = UpdateLedgerBalanceService.Instance;
    service.Subscribe();
    const ledgerProjection = new LedgerProjection();
    ledgerProjection.Project();
    const transactionProjection = new TransactionProjection();
    transactionProjection.Amount = -1;
    transactionProjection.LedgerId = ledgerProjection.Id;
    transactionProjection.Project();
    const allocationRequestedEvent = new AllocationRequestedEvent();
    const createAllocationSaga = new CreateAllocationSaga(allocationRequestedEvent);
    const transactionCreatedEvent = new TransactionCreatedEvent(createAllocationSaga.Name, createAllocationSaga.Id);
    transactionCreatedEvent.TransactionId = transactionProjection.Id;
    transactionCreatedEvent.Publish();
    const projectionStore = ProjectionStore.Instance;
    const projections = projectionStore.GetProjections(LedgerProjection);
    const projection = projections[0];
    assert.equal(projection.Balance, 1);
  });
  it("should update projection with expense", () => {
    const service = UpdateLedgerBalanceService.Instance;
    service.Subscribe();
    const ledgerProjection = new LedgerProjection();
    ledgerProjection.Project();
    const transactionProjection = new TransactionProjection();
    transactionProjection.Amount = -1;
    transactionProjection.LedgerId = ledgerProjection.Id;
    transactionProjection.Project();
    const expenseRequestedEvent = new ExpenseRequestedEvent();
    const createExpenseSaga = new CreateExpenseSaga(expenseRequestedEvent);
    const transactionCreatedEvent = new TransactionCreatedEvent(createExpenseSaga.Name, createExpenseSaga.Id);
    transactionCreatedEvent.TransactionId = transactionProjection.Id;
    transactionCreatedEvent.Publish();
    const projectionStore = ProjectionStore.Instance;
    const projections = projectionStore.GetProjections(LedgerProjection);
    const projection = projections[0];
    assert.equal(projection.Balance, 1);
  });
});

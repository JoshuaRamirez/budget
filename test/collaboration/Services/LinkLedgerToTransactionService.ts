import { assert } from "chai";
import "mocha";
import { ProjectionStore } from "../../../source/Core/ProjectionStore";
import { Subscriptions } from "../../../source/Core/Subscriptions";
import { AllocationRequestedEvent } from "../../../source/Events/AllocationRequestedEvent";
import { ExpenseRequestedEvent } from "../../../source/Events/ExpenseRequestedEvent";
import { TransactionCreatedEvent } from "../../../source/Events/TransactionCreatedEvent";
import { LedgerProjection } from "../../../source/Projections/LedgerProjection";
import { TransactionProjection } from "../../../source/Projections/TransactionProjection";
import { CreateAllocationSaga } from "../../../source/Sagas/CreateAllocationSaga";
import { CreateExpenseSaga } from "../../../source/Sagas/CreateExpenseSaga";
import { LinkLedgerToTransactionService } from "../../../source/Services/LinkLedgerToTransactionService";


describe("LinkLedgerToTransactionService", () => {
  beforeEach(() => {
    Subscriptions.Release();
    ProjectionStore.Instance.ClearAll();
  });
  it("should link transaction from allocation", () => {
    const service = LinkLedgerToTransactionService.Instance;
    service.Subscribe();
    const ledgerProjection = new LedgerProjection();
    ledgerProjection.Project();
    const transactionProjection = new TransactionProjection();
    transactionProjection.LedgerId = ledgerProjection.Id;
    transactionProjection.Project();
    const allocationRequestedSaga = new AllocationRequestedEvent();
    const saga = new CreateAllocationSaga(allocationRequestedSaga);
    const event = new TransactionCreatedEvent(saga.Name, saga.Id);
    event.TransactionId = transactionProjection.Id;
    event.Publish();
    const projectionStore = ProjectionStore.Instance;
    const projections = projectionStore.GetProjections(LedgerProjection);
    const projection = projections[0];
    assert.equal(projection.TransactionIds[0], transactionProjection.Id);
  });
  it("should link transaction from expense", () => {
    const service = LinkLedgerToTransactionService.Instance;
    service.Subscribe();
    const ledgerProjection = new LedgerProjection();
    ledgerProjection.Project();
    const transactionProjection = new TransactionProjection();
    transactionProjection.LedgerId = ledgerProjection.Id;
    transactionProjection.Project();
    const expenseRequestedSaga = new ExpenseRequestedEvent();
    const saga = new CreateExpenseSaga(expenseRequestedSaga);
    const event = new TransactionCreatedEvent(saga.Name, saga.Id);
    event.TransactionId = transactionProjection.Id;
    event.Publish();
    const projectionStore = ProjectionStore.Instance;
    const projections = projectionStore.GetProjections(LedgerProjection);
    const projection = projections[0];
    assert.equal(projection.TransactionIds[0], transactionProjection.Id);
  });
});

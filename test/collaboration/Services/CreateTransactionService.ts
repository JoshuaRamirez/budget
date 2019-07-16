import { assert } from "chai";
import "mocha";
import { ProjectionStore } from "../../../source/Core/ProjectionStore";
import { Subscriptions } from "../../../source/Core/Subscriptions";
import { AllocationRequestedEvent } from "../../../source/Events/AllocationRequestedEvent";
import { ExpenseRequestedEvent } from "../../../source/Events/ExpenseRequestedEvent";
import { TransactionRequestedEvent } from "../../../source/Events/TransactionRequestedEvent";
import { TransactionProjection } from "../../../source/Projections/TransactionProjection";
import { CreateAllocationSaga } from "../../../source/Sagas/CreateAllocationSaga";
import { CreateExpenseSaga } from "../../../source/Sagas/CreateExpenseSaga";
import { CreateTransactionService } from "../../../source/Services/CreateTransactionService";


describe("CreateTransactionService", () => {
  beforeEach(() => {
    Subscriptions.Release();
    ProjectionStore.Instance.ClearAll();
  });
  it("should create projection from allocation", () => {
    const service = CreateTransactionService.Instance;
    service.Subscribe();
    const allocationRequestedEvent = new AllocationRequestedEvent();
    const saga = new CreateAllocationSaga(allocationRequestedEvent);
    saga.Save();
    const event = new TransactionRequestedEvent(saga.Name, saga.Id);
    event.Publish();
    const projectionStore = ProjectionStore.Instance;
    const projections = projectionStore.GetProjections(TransactionProjection);
    const projection = projections[0];
    assert.exists(projection);
  });
  it("should create projection from expense", () => {
    const service = CreateTransactionService.Instance;
    service.Subscribe();
    const expenseRequestedEvent = new ExpenseRequestedEvent();
    const saga = new CreateExpenseSaga(expenseRequestedEvent);
    saga.Save();
    const event = new TransactionRequestedEvent(saga.Name, saga.Id);
    event.Publish();
    const projectionStore = ProjectionStore.Instance;
    const projections = projectionStore.GetProjections(TransactionProjection);
    const projection = projections[0];
    assert.exists(projection);
  });
});

import { assert } from "chai";
import "mocha";
import { ProjectionStore } from "../../../../source/Core/ProjectionStore";
import { ExpenseRequestedEvent } from "../../../../source/Events/ExpenseRequestedEvent";
import { TransactionCreatedEvent } from "../../../../source/Events/TransactionCreatedEvent";
import { ExpenseProjection } from "../../../../source/Projections/ExpenseProjection";
import { TransactionProjection } from "../../../../source/Projections/TransactionProjection";
import { CreateExpenseSaga } from "../../../../source/Sagas/CreateExpenseSaga";
import { CreateExpenseService } from "../../../../source/Services/Creates/CreateExpenseService";


describe("CreateExpenseService", () => {
  it("should create projection", () => {
    const service = CreateExpenseService.Instance;
    service.Subscribe();
    const allocationRequestedEvent = new ExpenseRequestedEvent();
    const saga = new CreateExpenseSaga(allocationRequestedEvent);
    saga.Save();
    const transactionCreatedEvent = new TransactionCreatedEvent(saga.Name, saga.Id);
    const transactionProjection = new TransactionProjection();
    transactionProjection.Project();
    transactionCreatedEvent.TransactionId = transactionProjection.Id;
    transactionCreatedEvent.Publish();
    const projectionStore = ProjectionStore.Instance;
    const projections = projectionStore.GetProjections(ExpenseProjection);
    const projection = projections[0];
    assert.exists(projection);
  });
});

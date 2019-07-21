import { assert } from "chai";
import "mocha";
import { ProjectionStore } from "../../../source/Core/ProjectionStore";
import { AllocationRequestedEvent } from "../../../source/Events/AllocationRequestedEvent";
import { TransactionCreatedEvent } from "../../../source/Events/TransactionCreatedEvent";
import { AllocationProjection } from "../../../source/Projections/AllocationProjection";
import { TransactionProjection } from "../../../source/Projections/TransactionProjection";
import { CreateAllocationSaga } from "../../../source/Sagas/CreateAllocationSaga";
import { CreateAllocationService } from "../../../source/Services/CreateAllocationService";


describe("CreateAllocationService", () => {
  it("should create projection", () => {
    const service = CreateAllocationService.Instance;
    service.Subscribe();
    const allocationRequestedEvent = new AllocationRequestedEvent();
    const saga = new CreateAllocationSaga(allocationRequestedEvent);
    saga.Save();
    const transactionProjection = new TransactionProjection();
    transactionProjection.Project();
    const transactionCreatedEvent = new TransactionCreatedEvent(saga.Name, saga.Id);
    transactionCreatedEvent.TransactionId = transactionProjection.Id;
    transactionCreatedEvent.Publish();
    const projectionStore = ProjectionStore.Instance;
    const projections = projectionStore.GetProjections(AllocationProjection);
    const projection = projections[0];
    assert.exists(projection);
  });
});

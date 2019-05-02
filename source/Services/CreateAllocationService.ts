import { ISubscriber } from "../Core/ISubscriber";
import { ProjectionStore } from "../Core/ProjectionStore";
import { SagaStore } from "../Core/SagaStore";
import { AllocationRequestedEvent } from "../Events/AllocationRequestedEvent";
import { TransactionCreatedEvent } from "../Events/TransactionCreatedEvent";
import { TransactionSubmittedEvent } from "../Events/TransactionSubmittedEvent";
import { AllocationProjection } from "../Projections/AllocationProjection";

export class CreateAllocationService implements ISubscriber<TransactionCreatedEvent> {
  public static Instance = new CreateAllocationService();
  public Process(event: TransactionCreatedEvent) {
    if (!event.SagaId) { return; }
    const sagaName = AllocationRequestedEvent.name;
    const sagaId = event.SagaId; // TODO: Standardize ID Names
    const saga = SagaStore.Instance.GetSaga(sagaName, sagaId);
    saga.sagaData.transactionId = event.Transaction.Id; // TODO: Standardize ID Names
    const originalEvent: TransactionSubmittedEvent = saga.sagaData.originalEvent;
    const allocationProjection: AllocationProjection = new AllocationProjection();
    allocationProjection.Amount = originalEvent.Amount;
    allocationProjection.LedgerId = originalEvent.LedgerId;
    allocationProjection.TransactionId = saga.sagaData.transactionId;
    ProjectionStore.Instance.Project(allocationProjection);
  }
}

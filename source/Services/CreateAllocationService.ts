import { ISubscriber } from "../Core/ISubscriber";
import { ProjectionStore } from "../Core/ProjectionStore";
import { Publisher } from "../Core/Publisher";
import { SagaStore } from "../Core/SagaStore";
import { TransactionCreatedEvent } from "../Events/TransactionCreatedEvent";
import { AllocationProjection } from "../Projections/AllocationProjection";
import { CreateAllocationSaga } from "../Sagas/CreateAllocationSaga";

export class CreateAllocationService implements ISubscriber<TransactionCreatedEvent> {
  public static Instance = new CreateAllocationService();
  public Process(event: TransactionCreatedEvent) {
    if (!event.SagaId) { return; }
    const sagaId = event.SagaId;
    const saga = SagaStore.Instance.GetSaga<CreateAllocationSaga>(sagaId);
    saga.TransactionId = event.Transaction.Id; // TODO: Think about saga persistence in fb cloud
    const allocationProjection: AllocationProjection = new AllocationProjection();
    allocationProjection.Amount = saga.Amount;
    allocationProjection.LedgerId = saga.LedgerId;
    allocationProjection.TransactionId = event.Transaction.Id;
    ProjectionStore.Instance.Project(allocationProjection);
  }
  public Subscribe() {
    Publisher.Instance.Subscribe(TransactionCreatedEvent, this);
  }
}

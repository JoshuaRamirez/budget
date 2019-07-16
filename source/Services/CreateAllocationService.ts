import { Handler } from "../Core/Handler";
import { TransactionCreatedEvent } from "../Events/TransactionCreatedEvent";
import { AllocationProjection } from "../Projections/AllocationProjection";
import { CreateAllocationSaga } from "../Sagas/CreateAllocationSaga";

export class CreateAllocationService extends Handler<TransactionCreatedEvent> {
  public static Instance = new CreateAllocationService();
  private constructor() {
    super(TransactionCreatedEvent);
  }
  public Process(event: TransactionCreatedEvent) {
    // Quit if Saga doesn't exist on Event
    if (!event.SagaId) {
      return;
    }
    // Quit if Saga doesn't match this Service
    if (event.SagaName !== CreateAllocationSaga.name) {
      return;
    }
    // Create AllocationProjection using Saga
    const sagaId = event.SagaId;
    const saga = CreateAllocationSaga.Get(sagaId);
    saga.TransactionId = event.Transaction.Id; // TODO: Think about saga persistence in fb cloud
    const allocationProjection: AllocationProjection = new AllocationProjection();
    allocationProjection.Amount = saga.Amount;
    allocationProjection.LedgerId = saga.LedgerId;
    allocationProjection.TransactionId = event.Transaction.Id;
    allocationProjection.Project();
  }
}

import { SagaStore } from "../Core/SagaStore";
import { AllocationRequestedEvent } from "../Events/AllocationRequestedEvent";
import { TransactionCreatedEvent } from "../Events/TransactionCreatedEvent";
import { TransactionSubmittedEvent } from "../Events/TransactionSubmittedEvent";
import { AllocationProjection } from "../Projections/AllocationProjection";
import { AllocationProjectionStore } from "../ProjectionStores/AllocationProjectionStore";

export class CreateAllocationService {
  private allocationProjectionStore: AllocationProjectionStore = AllocationProjectionStore.Instance;
  public Process(transactionCreatedEvent: TransactionCreatedEvent) {
    if (!transactionCreatedEvent.SagaId) { return; }
    const createAllocationProjection = () => {
      const originalEvent: TransactionSubmittedEvent = saga.sagaData.originalEvent;
      const newAllocation: AllocationProjection = new AllocationProjection();
      newAllocation.Amount = originalEvent.Amount;
      newAllocation.LedgerId = originalEvent.LedgerId;
      newAllocation.TransactionId = saga.sagaData.transactionId;
      this.allocationProjectionStore.Project(newAllocation);
    };
    const sagaName = AllocationRequestedEvent.name;
    const sagaId = transactionCreatedEvent.SagaId; // TODO: Standardize ID Names
    const saga = SagaStore.Instance.GetSaga(sagaName, sagaId);
    saga.sagaData.transactionId = transactionCreatedEvent.Transaction.Id; // TODO: Standardize ID Names
    createAllocationProjection();
  }
}

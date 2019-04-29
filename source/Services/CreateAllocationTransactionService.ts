import { SagaStore } from "../Core/SagaStore";
import { AllocationRequestedEvent } from "../Events/AllocationRequestedEvent";
import { TransactionSubmittedEvent } from "../Events/TransactionSubmittedEvent";
import { AllocationProjectionStore } from "../ProjectionStores/AllocationProjectionStore";

export class CreateAllocationTransactionService {
  private allocationProjectionStore: AllocationProjectionStore = AllocationProjectionStore.Instance;
  public Process(allocationRequestedEvent: AllocationRequestedEvent) {
    const startNewSaga = () => {
      const sagaName = AllocationRequestedEvent.name;
      const sagaData = {
        originalEvent: allocationRequestedEvent,
      };
      const newSaga = SagaStore.Instance.SaveSaga(sagaName, sagaData);
      return newSaga;
    };
    const submitNewTransaction = () => {
      const transactionSubmittedEvent = new TransactionSubmittedEvent();
      transactionSubmittedEvent.Amount = allocationRequestedEvent.Amount;
      transactionSubmittedEvent.Destination = allocationRequestedEvent.LedgerId;
      transactionSubmittedEvent.LedgerId = allocationRequestedEvent.LedgerId;
      transactionSubmittedEvent.Source = "Allocation";
      transactionSubmittedEvent.Type = "Allocation";
      if (saga) { transactionSubmittedEvent.SagaId = saga.sagaId; }
      transactionSubmittedEvent.Publish(transactionSubmittedEvent);
    };
    const saga = startNewSaga();
    submitNewTransaction();
  }
}

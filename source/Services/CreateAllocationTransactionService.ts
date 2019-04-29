import { ISubscriber } from "../Core/ISubscriber";
import { SagaStore } from "../Core/SagaStore";
import { AllocationRequestedEvent } from "../Events/AllocationRequestedEvent";
import { TransactionSubmittedEvent } from "../Events/TransactionSubmittedEvent";

export class CreateAllocationTransactionService implements ISubscriber<TransactionSubmittedEvent> {
  public Process(event: AllocationRequestedEvent) {
    const startNewSaga = () => {
      const sagaName = AllocationRequestedEvent.name;
      const sagaData = {
        originalEvent: event,
      };
      const newSaga = SagaStore.Instance.SaveSaga(sagaName, sagaData);
      return newSaga;
    };
    const submitNewTransaction = () => {
      const transactionSubmittedEvent = new TransactionSubmittedEvent();
      transactionSubmittedEvent.Amount = event.Amount;
      transactionSubmittedEvent.Destination = event.LedgerId;
      transactionSubmittedEvent.LedgerId = event.LedgerId;
      transactionSubmittedEvent.Source = "Allocation";
      transactionSubmittedEvent.Type = "Allocation";
      if (saga) { transactionSubmittedEvent.SagaId = saga.sagaId; }
      transactionSubmittedEvent.Publish();
    };
    const saga = startNewSaga();
    submitNewTransaction();
  }
}

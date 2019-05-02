import { ISubscriber } from "../Core/ISubscriber";
import { SagaStore } from "../Core/SagaStore";
import { TransactionSubmittedEvent } from "../Events/TransactionSubmittedEvent";
import { CreateAllocationSaga } from "../Sagas/CreateAllocationSaga";

export class CreateAllocationTransactionService implements ISubscriber<TransactionSubmittedEvent> {
  public static Instance = new CreateAllocationTransactionService();
  public Process(event: TransactionSubmittedEvent): void {
    const saga = this.startNewSaga(event);
    this.submitNewTransaction(event, saga);
  }
  private startNewSaga(event: TransactionSubmittedEvent): CreateAllocationSaga {
    const saga = new CreateAllocationSaga();
    saga.Amount = event.Amount;
    saga.LedgerId = event.LedgerId;
    SagaStore.Instance.SaveSaga(saga);
    return saga;
  }
  private submitNewTransaction(event: TransactionSubmittedEvent, saga: CreateAllocationSaga) {
    const transactionSubmittedEvent = new TransactionSubmittedEvent();
    transactionSubmittedEvent.Amount = event.Amount;
    transactionSubmittedEvent.Destination = event.LedgerId;
    transactionSubmittedEvent.LedgerId = event.LedgerId;
    transactionSubmittedEvent.Source = "Allocation";
    transactionSubmittedEvent.Type = "Allocation";
    transactionSubmittedEvent.SagaId = saga.Id;
    transactionSubmittedEvent.Publish();
  }
}

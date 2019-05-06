import { ISubscriber } from "../Core/ISubscriber";
import { Publisher } from "../Core/Publisher";
import { AllocationRequestedEvent } from "../Events/AllocationRequestedEvent";
import { TransactionRequestedEvent } from "../Events/TransactionRequestedEvent";
import { CreateAllocationSaga } from "../Sagas/CreateAllocationSaga";

export class CreateAllocationTransactionService implements ISubscriber<AllocationRequestedEvent> {
  public static Instance = new CreateAllocationTransactionService();
  public Process(event: AllocationRequestedEvent): void {
    // Start New Saga
    const saga = new CreateAllocationSaga(event);
    saga.Save();
    // Publish TransactionCreatedEvent
    const transactionRequestedEvent = new TransactionRequestedEvent(saga.Name, saga.Id);
    transactionRequestedEvent.Amount = event.Amount;
    transactionRequestedEvent.Destination = event.LedgerId;
    transactionRequestedEvent.LedgerId = event.LedgerId;
    transactionRequestedEvent.Source = "Allocation";
    transactionRequestedEvent.Type = "Allocation";
    transactionRequestedEvent.Publish();
  }
  public Subscribe() {
    Publisher.Instance.Subscribe(AllocationRequestedEvent, this);
  }
}

import { ISubscriber } from "../Core/ISubscriber";
import { Publisher } from "../Core/Publisher";
import { SagaStore } from "../Core/SagaStore";
import { AllocationRequestedEvent } from "../Events/AllocationRequestedEvent";
import { TransactionSubmittedEvent } from "../Events/TransactionSubmittedEvent";
import { CreateAllocationSaga } from "../Sagas/CreateAllocationSaga";

export class CreateAllocationTransactionService implements ISubscriber<AllocationRequestedEvent> {
  public static Instance = new CreateAllocationTransactionService();
  public Process(event: AllocationRequestedEvent): void {
    // Start New Saga
    const saga = new CreateAllocationSaga();
    saga.Amount = event.Amount;
    saga.LedgerId = event.LedgerId;
    SagaStore.Instance.SaveSaga(saga);
    // Submit New Transaction
    const transactionSubmittedEvent = new TransactionSubmittedEvent();
    transactionSubmittedEvent.Amount = event.Amount;
    transactionSubmittedEvent.Destination = event.LedgerId;
    transactionSubmittedEvent.LedgerId = event.LedgerId;
    transactionSubmittedEvent.Source = "Allocation";
    transactionSubmittedEvent.Type = "Allocation";
    transactionSubmittedEvent.SagaId = saga.Id;
    transactionSubmittedEvent.SagaName = saga.Name;
    transactionSubmittedEvent.Publish();
  }
  public Subscribe() {
    Publisher.Instance.Subscribe(AllocationRequestedEvent, this);
  }
}

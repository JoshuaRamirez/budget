import { AccountRequestedEvent } from "../Events/AccountRequestedEvent";
import { AllocationRequestedEvent } from "../Events/AllocationRequestedEvent";
import { LedgerRequestedEvent } from "../Events/LedgerRequestedEvent";
import { TransactionCreatedEvent } from "../Events/TransactionCreatedEvent";
import { TransactionSubmittedEvent } from "../Events/TransactionSubmittedEvent";
import { CreateAccountService } from "../Services/CreateAccountService";
import { CreateAllocationService } from "../Services/CreateAllocationService";
import { CreateLedgerService } from "../Services/CreateLedgerService";
import { CreateTransactionService } from "../Services/CreateTransactionService";

export class Subscriber {
  public Subscribe() {

    const newAccountSubmittedEvent = new AccountRequestedEvent();
    const newAllocationSubmittedEvent = new AllocationRequestedEvent();
    const newLedgerRequestedEvent = new LedgerRequestedEvent();
    const newTransactionCreatedEvent = new TransactionCreatedEvent();
    const newTransactionSubmittedEvent = new TransactionSubmittedEvent();

    const createAccountService = new CreateAccountService();
    const createAllocationService = new CreateAllocationService();
    const createLedgerService = new CreateLedgerService();
    const createTransactionService = new CreateTransactionService();

    newAccountSubmittedEvent.Subscribe(
      newAccountSubmittedEvent.EventName,
      createAccountService.Process.bind(createAccountService));

    newAllocationSubmittedEvent.Subscribe(
      newAllocationSubmittedEvent.EventName,
      createAllocationService.Process1.bind(createAllocationService));

    newLedgerRequestedEvent.Subscribe(
      newLedgerRequestedEvent.EventName,
      createLedgerService.Process.bind(createLedgerService));

    newTransactionCreatedEvent.Subscribe(
      newTransactionCreatedEvent.EventName,
      createAllocationService.Process2.bind(createAllocationService));

    newTransactionSubmittedEvent.Subscribe(
      newTransactionSubmittedEvent.EventName,
      createTransactionService.Process.bind(createTransactionService));

  }
}

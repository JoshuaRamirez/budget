import { AccountRequestedEvent } from "../Events/AccountRequestedEvent";
import { AllocationRequestedEvent } from "../Events/AllocationRequestedEvent";
import { LedgerRequestedEvent } from "../Events/LedgerRequestedEvent";
import { TransactionCreatedEvent } from "../Events/TransactionCreatedEvent";
import { TransactionSubmittedEvent } from "../Events/TransactionSubmittedEvent";
import { CreateAccountService } from "../Services/CreateAccountService";
import { CreateAllocationService } from "../Services/CreateAllocationService";
import { CreateAllocationTransactionService } from "../Services/CreateAllocationTransactionService";
import { CreateLedgerService } from "../Services/CreateLedgerService";
import { CreateTransactionService } from "../Services/CreateTransactionService";
import { Publisher } from "./Publisher";

export class Subscriptions {
  public Create() {

    const publisher = Publisher.Instance;

    const createAccountService = new CreateAccountService();
    const createAllocationService = new CreateAllocationService();
    const createAllocationTransactionService = new CreateAllocationTransactionService();
    const createLedgerService = new CreateLedgerService();
    const createTransactionService = new CreateTransactionService();

    publisher.Subscribe(AccountRequestedEvent, createAccountService);
    publisher.Subscribe(AllocationRequestedEvent, createAllocationTransactionService);
    publisher.Subscribe(LedgerRequestedEvent, createLedgerService);
    publisher.Subscribe(TransactionCreatedEvent, createAllocationService);
    publisher.Subscribe(TransactionSubmittedEvent, createTransactionService);

  }
}

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
    publisher.Subscribe(AccountRequestedEvent, CreateAccountService.Instance);
    publisher.Subscribe(AllocationRequestedEvent, CreateAllocationTransactionService.Instance);
    publisher.Subscribe(LedgerRequestedEvent, CreateLedgerService.Instance);
    publisher.Subscribe(TransactionCreatedEvent, CreateAllocationService.Instance);
    publisher.Subscribe(TransactionSubmittedEvent, CreateTransactionService.Instance);
  }
}

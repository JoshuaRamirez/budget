import { AccountCreatedEvent } from "../../Events/AccountCreatedEvent";
import { LedgerRequestedEvent } from "../../Events/LedgerRequestedEvent";
import { EventChain } from "../Core/EventChain";
import { EventLink } from "../Core/EventLink";

export class PublishLedgerRequestedService extends EventChain {
  public static Instance = new PublishLedgerRequestedService();
  private static onAccountCreated(accountCreatedEvent: AccountCreatedEvent) {
    const ledgerRequestedEvent = new LedgerRequestedEvent();
    ledgerRequestedEvent.AccountId = accountCreatedEvent.AccountId;
    ledgerRequestedEvent.Type = "System";
    return ledgerRequestedEvent;
  }
  constructor() {
    super();
    const eventLink = new EventLink(AccountCreatedEvent, PublishLedgerRequestedService.onAccountCreated);
    this.Link(eventLink);
  }
}

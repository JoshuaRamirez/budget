import { AccountCreatedEvent } from "../../Events/AccountCreatedEvent";
import { LedgerRequestedEvent } from "../../Events/LedgerRequestedEvent";
import { Continuation } from "../Core/Continuation";
import { EventLink } from "../Core/EventLink";

export class PublishLedgerRequestedService extends Continuation {
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

import { EventChain } from "../../Core/EventChain";
import { EventLink } from "../../Core/EventLink";
import { AccountCreatedEvent } from "../../Events/AccountCreatedEvent";
import { LedgerRequestedEvent } from "../../Events/LedgerRequestedEvent";

export class RequestLedgerService extends EventChain {
  public static Instance = new RequestLedgerService();
  constructor() {
    super();
    this.Link(new EventLink(AccountCreatedEvent, this.onAccountCreated));
  }
  private onAccountCreated(input: AccountCreatedEvent) {
    const ledgerRequestedEvent = new LedgerRequestedEvent();
    ledgerRequestedEvent.AccountId = input.AccountId;
    ledgerRequestedEvent.Type = "System";
    return ledgerRequestedEvent;
  }
}

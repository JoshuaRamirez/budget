import { AccountCreatedEvent } from "../../Events/AccountCreatedEvent";
import { LedgerRequestedEvent } from "../../Events/LedgerRequestedEvent";
import { Continuation } from "../Core/Continuation";
import { ContinuationHandler } from "../Core/ContinuationHandler";

export class RequestLedgerService extends Continuation {
  public static Instance = new RequestLedgerService();
  private static onAccountCreated(accountCreatedEvent: AccountCreatedEvent) {
    const ledgerRequestedEvent = new LedgerRequestedEvent();
    ledgerRequestedEvent.AccountId = accountCreatedEvent.AccountId;
    ledgerRequestedEvent.Type = "System";
    return ledgerRequestedEvent;
  }
  constructor() {
    super();
    const continuationHandler = new ContinuationHandler(AccountCreatedEvent, RequestLedgerService.onAccountCreated);
    this.Link(continuationHandler);
  }
}

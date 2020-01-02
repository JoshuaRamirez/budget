import { AccountCreatedEvent } from "../../Events/Created/AccountCreatedEvent";
import { LedgerRequestedEvent } from "../../Events/Requested/Creation/LedgerRequestedEvent";
import { Route } from "../Core/Route";
import { Router } from "../Core/Router";

export class RequestLedgerService extends Router {
  public static Instance = new RequestLedgerService();
  private static onAccountCreated(accountCreatedEvent: AccountCreatedEvent) {
    const ledgerRequestedEvent = new LedgerRequestedEvent();
    ledgerRequestedEvent.AccountId = accountCreatedEvent.AccountId;
    ledgerRequestedEvent.Type = "System";
    return ledgerRequestedEvent;
  }
  constructor() {
    super();
    const route = new Route(AccountCreatedEvent, RequestLedgerService.onAccountCreated);
    this.Link(route);
  }
}

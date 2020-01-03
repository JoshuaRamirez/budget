import { MapAccountCreatedToLedgerRequested } from "../../Events/Core/Mappers";
import { AccountCreatedEvent } from "../../Events/Created/AccountCreatedEvent";
import { LedgerRequestedEvent } from "../../Events/Requested/Creation/LedgerRequestedEvent";
import { Route } from "../Core/Route";
import { Router } from "../Core/Router";

export class AccountCreatedToLedgerRequested extends Route<AccountCreatedEvent, LedgerRequestedEvent> {
  public static Instance = new AccountCreatedToLedgerRequested();
  constructor() {
    super(AccountCreatedEvent, MapAccountCreatedToLedgerRequested);
    Router.Instance.Link(this);
  }
}

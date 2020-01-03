import { AccountCreatedEvent } from "../Created/AccountCreatedEvent";
import { UserCreatedEvent } from "../Created/UserCreatedEvent";
import { AccountRequestedEvent } from "../Requested/Creation/AccountRequestedEvent";
import { LedgerRequestedEvent } from "../Requested/Creation/LedgerRequestedEvent";

export function MapUserCreatedEventToAccountRequestedEvent(userCreatedEvent: UserCreatedEvent) {
  const accountRequestedEvent = new AccountRequestedEvent();
  accountRequestedEvent.AccountName = "Income";
  accountRequestedEvent.Type = "System";
  accountRequestedEvent.UserId = userCreatedEvent.UserId;
  return accountRequestedEvent;
}
export function MapAccountCreatedToLedgerRequested(accountCreatedEvent: AccountCreatedEvent) {
  const ledgerRequestedEvent = new LedgerRequestedEvent();
  ledgerRequestedEvent.AccountId = accountCreatedEvent.AccountId;
  ledgerRequestedEvent.Type = "System";
  return ledgerRequestedEvent;
}

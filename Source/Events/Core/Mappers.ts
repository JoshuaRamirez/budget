import { AccountCreatedEvent } from "../Created/AccountCreatedEvent";
import { UserCreatedEvent } from "../Created/UserCreatedEvent";
import { AccountRequestedEvent } from "../Requested/Creation/AccountRequestedEvent";
import { LedgerRequestedEvent } from "../Requested/Creation/LedgerRequestedEvent";

export async function MapUserCreatedEventToAccountRequestedEvent(userCreatedEvent: UserCreatedEvent): Promise<AccountRequestedEvent> {
  const accountRequestedEvent = new AccountRequestedEvent();
  accountRequestedEvent.AccountName = "Income";
  accountRequestedEvent.Type = "System";
  accountRequestedEvent.UserId = userCreatedEvent.UserId;
  return new Promise((resolve, reject) => resolve(accountRequestedEvent));
}
export async function MapAccountCreatedToLedgerRequested(accountCreatedEvent: AccountCreatedEvent): Promise<LedgerRequestedEvent> {
  const ledgerRequestedEvent = new LedgerRequestedEvent();
  ledgerRequestedEvent.AccountId = accountCreatedEvent.AccountId;
  ledgerRequestedEvent.Type = "System";
  return new Promise((resolve, reject) => resolve(ledgerRequestedEvent));
}

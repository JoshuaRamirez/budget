import { MainEvent } from "../Core/MainEvent";

export class AccountRequestedEvent extends MainEvent<AccountRequestedEvent> {
  public Name: string;
  public Type: string;
  constructor() {
    super(AccountRequestedEvent.name);
  }
}

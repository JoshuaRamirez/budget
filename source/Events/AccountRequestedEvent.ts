import { MainEvent } from "../Core/MainEvent";
import { Publisher } from "../Core/Publisher";

export class AccountRequestedEvent extends MainEvent<AccountRequestedEvent> {
  public Name: string;
  public Type: string;
  constructor() {
    super(AccountRequestedEvent.name);
  }
  public Publish() {
    Publisher.Instance.Publish(this);
  }
}

import { MainEvent } from "../Core/MainEvent";
import { Publisher } from "../Core/Publisher";

export class LedgerRequestedEvent extends MainEvent<LedgerRequestedEvent> {
  public Account: any;
  public Name: string;
  public Type: string;
  constructor() {
    super(LedgerRequestedEvent.name);
  }
  public Publish() {
    Publisher.Instance.Publish(this);
  }
}

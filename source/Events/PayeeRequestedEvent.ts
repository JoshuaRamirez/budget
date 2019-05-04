import { MainEvent } from "../Core/MainEvent";
import { Publisher } from "../Core/Publisher";

export class PayeeRequestedEvent extends MainEvent<PayeeRequestedEvent> {
  public Description: string;
  public Name: string;
  public Type: string;
  constructor() {
    super(PayeeRequestedEvent.name);
  }
  public Publish() {
    Publisher.Instance.Publish(this);
  }
}

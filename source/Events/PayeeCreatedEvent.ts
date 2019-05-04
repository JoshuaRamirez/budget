import { MainEvent } from "../Core/MainEvent";
import { Publisher } from "../Core/Publisher";

export class PayeeCreatedEvent extends MainEvent<PayeeCreatedEvent> {
  public PayeeName: string;
  public Type: string;
  public TransactionIds: any[] = [];
  constructor() {
    super(PayeeCreatedEvent.name);
  }
  public Publish() {
    Publisher.Instance.Publish(this);
  }
}

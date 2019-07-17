import { Publisher } from "../Core/Publisher";
import { SagaEvent } from "../Core/SagaEvent";

export class TransactionRequestedEvent extends SagaEvent {
  public Amount: number;
  public Destination: any; // TODO: What's this?
  public LedgerId: any;
  public Source: any;
  public Type: string;
  constructor(sagaName: string, sagaId: any) {
    super(sagaName, sagaId);
  }
  public Publish() {
    Publisher.Instance.Publish(this);
  }
}

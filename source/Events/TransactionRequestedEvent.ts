import { Publisher } from "../Core/Publisher";
import { SagaEvent } from "../Core/SagaEvent";

export class TransactionRequestedEvent extends SagaEvent {
  public Amount: number;
  public Destination: any;
  public LedgerId: any;
  public Source: any;
  public Type: string;
  constructor(sagaName: string = null, sagaId: any = null) {
    super(TransactionRequestedEvent.name, sagaName, sagaId);
  }
  public Publish() {
    Publisher.Instance.Publish(this);
  }
}

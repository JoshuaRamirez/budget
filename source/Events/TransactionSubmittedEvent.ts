import { Publisher } from "../Core/Publisher";
import { SagaEvent } from "../Core/SagaEvent";

// TODO Rename TransactionSubmitted to Requested
export class TransactionSubmittedEvent extends SagaEvent<TransactionSubmittedEvent> {
  public Amount: number;
  public Destination: any;
  public LedgerId: any;
  public Source: any;
  public Type: string;
  constructor(sagaName: string = null, sagaId: any = null) {
    super(TransactionSubmittedEvent.name, sagaName, sagaId);
  }
  public Publish() {
    Publisher.Instance.Publish(this);
  }
}

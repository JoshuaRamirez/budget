import { Publisher } from "../Core/Publisher";
import { SagaEvent } from "../Core/SagaEvent";

export class TransactionCreatedEvent extends SagaEvent {
  public TransactionId: any;
  constructor(sagaName: string, sagaId: any) {
    super(sagaName, sagaId);
  }
  public Publish() {
    Publisher.Instance.Publish(this);
  }
}

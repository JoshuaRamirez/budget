import { Publisher } from "../Core/Publisher";
import { SagaEvent } from "../Core/SagaEvent";
import { TransactionProjection } from "../Projections/TransactionProjection";

export class TransactionCreatedEvent extends SagaEvent {
  public Amount: number;
  public Transaction: TransactionProjection; // TODO: Convert to ID
  constructor(sagaName: string, sagaId: any) { // TODO: Use Saga Class instead.
    super(TransactionCreatedEvent.name, sagaName, sagaId);
  }
  public Publish() {
    Publisher.Instance.Publish(this);
  }
}

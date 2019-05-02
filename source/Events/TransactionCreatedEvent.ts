import { SagaEvent } from "../Core/SagaEvent";
import { TransactionProjection } from "../Projections/TransactionProjection";

export class TransactionCreatedEvent extends SagaEvent<TransactionCreatedEvent> {
  public Amount: number;
  public Transaction: TransactionProjection; // TODO: Convert to ID
  constructor() {
    super(TransactionCreatedEvent.name);
  }
}

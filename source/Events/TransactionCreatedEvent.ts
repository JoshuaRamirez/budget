import { SagaEvent } from "../Core/SagaEvent";
import { TransactionProjection } from "../Projections/TransactionProjection/TransactionProjection";

export class TransactionCreatedEvent extends SagaEvent<TransactionCreatedEvent> {
  public Amount: number;
  public Transaction: TransactionProjection;
  constructor() {
    super(TransactionCreatedEvent.name);
  }
}

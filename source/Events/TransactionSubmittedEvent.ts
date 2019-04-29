import { SagaEvent } from "../Core/SagaEvent";

export class TransactionSubmittedEvent extends SagaEvent<TransactionSubmittedEvent> {
  public Amount: number;
  public Destination: any;
  public LedgerId: any;
  public Source: any;
  public Type: string;
  constructor() {
    super(TransactionSubmittedEvent.name);
  }
}

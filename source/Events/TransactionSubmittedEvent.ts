import { SagaEvent } from "../Core/SagaEvent";

// TODO Rename TransactionSubmitted to Requested
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

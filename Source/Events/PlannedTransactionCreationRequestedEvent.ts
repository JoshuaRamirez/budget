import { Event } from "./Core/Event";
import { Publisher } from "./Core/Publisher";

export class PlannedTransactionCreationRequestedEvent extends Event {
  public Amount: number;
  public Description: string;
  public RepeatPeriod: number;
  public RepeatMeasurement: string;
  public RepeatCount: number;
  public RepeatStart: Date;
  public TransactionType: string;
  public Publish(): void {
    Publisher.Instance.Publish(this);
  }
}

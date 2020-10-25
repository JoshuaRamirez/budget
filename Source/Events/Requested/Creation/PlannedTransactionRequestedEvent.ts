import { Event } from "../../Core/Event";
import { Publisher } from "../../Core/Publisher";

export class PlannedTransactionRequestedEvent extends Event {
  public Amount: number;
  public Description: string;
  public RepeatPeriod: number;
  public RepeatMeasurement: string;
  public RepeatCount: number;
  public RepeatStart: Date;
  public TransactionType: string;
  public async Publish(): Promise<void> {
    await Publisher.Instance.Publish(this);
    return new Promise((resolve, reject) => resolve());
  }
}

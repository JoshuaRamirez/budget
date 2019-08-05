import { Event } from "../Core/Event";
import { Publisher } from "../Core/Publisher";

export class PlannedExpenseRequestedEvent extends Event {
  public Amount: number;
  public Description: string;
  public RepeatPeriod: number;
  public RepeatMeasurement: string;
  public RepeatCount: number;
  public RepeatStart: Date;
  public Publish() {
    Publisher.Instance.Publish(this);
  }
}

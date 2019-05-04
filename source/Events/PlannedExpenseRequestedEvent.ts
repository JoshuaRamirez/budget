import { MainEvent } from "../Core/MainEvent";
import { Publisher } from "../Core/Publisher";

export class PlannedExpenseRequestedEvent extends MainEvent<PlannedExpenseRequestedEvent> {
  public Description: string;
  public Name: string;
  public RepeatPeriod: number;
  public RepeatMeasurement: string;
  public RepeatCount: number;
  public RepeatStart: Date;
  constructor() {
    super(PlannedExpenseRequestedEvent.name);
  }
  public Publish() {
    Publisher.Instance.Publish(this);
  }
}

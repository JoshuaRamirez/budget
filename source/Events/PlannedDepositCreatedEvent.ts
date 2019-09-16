import { Event } from "../Core/Event";
import { Publisher } from "../Core/Publisher";

export class PlannedDepositCreatedEvent extends Event {
  public PlannedDepositId: any;
  public Publish(): void {
    Publisher.Instance.Publish(this);
  }
}

import { Event } from "../Core/Event";
import { Publisher } from "../Core/Publisher";

export class AllocationRequestedEvent extends Event {
  public Amount: number;
  public LedgerId: any;
  public Publish() {
    Publisher.Instance.Publish(this);
  }
}

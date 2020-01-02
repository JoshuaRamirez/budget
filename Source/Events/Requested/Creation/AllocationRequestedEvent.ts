import { Event } from "../../Core/Event";
import { Publisher } from "../../Core/Publisher";

export class AllocationRequestedEvent extends Event {
  public LedgerId: any;
  public TransactionId: any;
  public Publish() {
    Publisher.Instance.Publish(this);
  }
}

import { Event } from "../../Core/Event";
import { Publisher } from "../../Core/Publisher";

export class AllocationRequestedEvent extends Event {
  public LedgerId: any;
  public TransactionId: any;
  public async Publish(): Promise<void> {
    await Publisher.Instance.Publish(this);
    return new Promise((resolve, reject) => resolve());
  }
}

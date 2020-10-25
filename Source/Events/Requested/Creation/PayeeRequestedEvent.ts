import { Event } from "../../Core/Event";
import { Publisher } from "../../Core/Publisher";

export class PayeeRequestedEvent extends Event {
  public Description: string;
  public PayeeName: string;
  public Type: string;
  public async Publish(): Promise<void> {
    await Publisher.Instance.Publish(this);
    return new Promise((resolve, reject) => resolve());
  }
}

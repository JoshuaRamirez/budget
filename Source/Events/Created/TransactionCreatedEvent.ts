import { Event } from "../Core/Event";
import { Publisher } from "../Core/Publisher";

export class TransactionCreatedEvent extends Event {
  public TransactionId: any;
  public async Publish(): Promise<void> {
    await Publisher.Instance.Publish(this);
    return new Promise((resolve, reject) => resolve());
  }
}

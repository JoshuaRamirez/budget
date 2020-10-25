import { Event } from "../../Core/Event";
import { Publisher } from "../../Core/Publisher";

export class LedgerRequestedEvent extends Event {
  public AccountId: any;
  public Type: string;
  public async Publish(): Promise<void> {
    await Publisher.Instance.Publish(this);
    return new Promise((resolve, reject) => resolve());
  }
}

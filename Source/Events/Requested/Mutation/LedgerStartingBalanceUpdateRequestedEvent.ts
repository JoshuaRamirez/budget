import { Event } from "../../Core/Event";
import { Publisher } from "../../Core/Publisher";

export class LedgerStartingBalanceUpdateRequestedEvent extends Event {
  public LedgerId: any;
  public StartingBalance: number;
  public async Publish(): Promise<void> {
    await Publisher.Instance.Publish(this);
    return new Promise((resolve, reject) => resolve());
  }
}

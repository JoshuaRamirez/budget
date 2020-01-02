import { Event } from "../../Core/Event";
import { Publisher } from "../../Core/Publisher";

export class LedgerStartingBalanceUpdateRequestedEvent extends Event {
  public LedgerId: any;
  public StartingBalance: number;
  public Publish(): void {
    Publisher.Instance.Publish(this);
  }
}

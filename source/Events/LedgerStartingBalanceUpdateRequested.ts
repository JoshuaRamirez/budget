import { Event } from "../Core/Event";
import { Publisher } from "../Core/Publisher";

export class LedgerStartingBalanceUpdateRequested extends Event {
  public LedgerId: any;
  public StartingBalance: number;
  constructor() {
    super(LedgerStartingBalanceUpdateRequested.name);
  }
  public Publish(): void {
    Publisher.Instance.Publish(this);
  }
}

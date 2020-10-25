import { Event } from "../../Core/Event";
import { Publisher } from "../../Core/Publisher";

export class TransactionRequestedEvent extends Event {
  public Amount: number;
  public Destination: any; // TODO: What's this?
  public LedgerId: any;
  public Source: any;
  public Type: string;
  public async Publish(): Promise<void> {
    await Publisher.Instance.Publish(this);
    return new Promise((resolve, reject) => resolve());
  }
}

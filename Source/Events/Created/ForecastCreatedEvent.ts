import { Event } from "../Core/Event";
import { Publisher } from "../Core/Publisher";

export class ForecastCreatedEvent extends Event {
  public ForecastId: any;
  public async Publish(): Promise<void> {
    await Publisher.Instance.Publish(this);
    return new Promise((resolve, reject) => resolve());
  }
}

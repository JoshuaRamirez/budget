import { Event } from "../Core/Event";
import { Publisher } from "../Core/Publisher";

export class DailyTimerIntervalPublishedEvent extends Event {
  public async Publish(): Promise<void> {
    await Publisher.Instance.Publish(this);
    return new Promise((resolve, reject) => resolve());
  }
}

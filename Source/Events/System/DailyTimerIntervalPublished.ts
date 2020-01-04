import { Event } from "../Core/Event";
import { Publisher } from "../Core/Publisher";

export class DailyTimerIntervalPublished extends Event {
  public Publish() {
    Publisher.Instance.Publish(this);
  }
}

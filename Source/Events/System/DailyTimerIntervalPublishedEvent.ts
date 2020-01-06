import { Event } from "../Core/Event";
import { Publisher } from "../Core/Publisher";

export class DailyTimerIntervalPublishedEvent extends Event {
  public Publish() {
    Publisher.Instance.Publish(this);
  }
}

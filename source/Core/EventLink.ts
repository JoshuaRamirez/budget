import { Event } from "./Event";
import { Handler } from "./Handler";

export class EventLink<TSubscriptionEvent extends Event, TPublicationEvent extends Event> extends Handler<TSubscriptionEvent> {
  private readonly action: (input: TSubscriptionEvent) => TPublicationEvent;
  public constructor(subscriptionEventType: any, action: (input: TSubscriptionEvent) => TPublicationEvent) {
    super(subscriptionEventType);
    this.action = action;
  }
  public Process(subscriptionEvent: TSubscriptionEvent): void {
    const publicationEvent = this.action(subscriptionEvent);
    publicationEvent.Publish();
  }
}

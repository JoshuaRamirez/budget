import { Event } from "./Event";
import { Handler } from "./Handler";

export class EventLink<TSubscriptionEvent extends Event, TPublicationEvent extends Event> extends Handler<TSubscriptionEvent> {
  private readonly publicationEventFactory: (input: TSubscriptionEvent) => TPublicationEvent;
  public constructor(subscriptionEventType: any, publicationEventFactory: (input: TSubscriptionEvent) => TPublicationEvent) {
    super(subscriptionEventType);
    this.publicationEventFactory = publicationEventFactory;
  }
  public Handle(subscriptionEvent: TSubscriptionEvent): void {
    const publicationEvent = this.publicationEventFactory(subscriptionEvent);
    publicationEvent.Publish();
  }
}

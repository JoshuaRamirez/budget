import { Event } from "../../Events/Core/Event";
import { Handler } from "./Handler";

export class EventLink<TSubscriptionEvent extends Event, TPublicationEvent extends Event> extends Handler<TSubscriptionEvent> {
  private readonly makePublicationEvent: (input: TSubscriptionEvent) => TPublicationEvent;
  public constructor(subscriptionEventType: any, publicationEventFactory: (input: TSubscriptionEvent) => TPublicationEvent) {
    super(subscriptionEventType);
    this.makePublicationEvent = publicationEventFactory;
  }
  public Handle(subscriptionEvent: TSubscriptionEvent): void {
    const publicationEvent = this.makePublicationEvent(subscriptionEvent);
    if (publicationEvent) {
      publicationEvent.Publish();
    }
  }
}

import { Event } from "../../Events/Core/Event";
import { Receiver } from "./Receiver";

export class Route<TSubscriptionEvent extends Event, TPublicationEvent extends Event> extends Receiver<TSubscriptionEvent> {
  private readonly eventTranslator: (input: TSubscriptionEvent) => TPublicationEvent;
  public constructor(subscriptionEventType: typeof Event, eventTranslator: (input: TSubscriptionEvent) => TPublicationEvent) {
    super(subscriptionEventType);
    this.eventTranslator = eventTranslator;
  }
  public Receive(subscriptionEvent: TSubscriptionEvent): void {
    const publicationEvent = this.eventTranslator(subscriptionEvent);
    if (publicationEvent) {
      publicationEvent.Publish();
    }
  }
}

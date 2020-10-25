import { Event } from "../../Events/Core/Event";
import { Receiver } from "./Receiver";

export class Route<TSubscriptionEvent extends Event, TPublicationEvent extends Event> extends Receiver<TSubscriptionEvent> {
  private readonly eventTranslator: (input: TSubscriptionEvent) => Promise<TPublicationEvent>;
  public constructor(subscriptionEventType: typeof Event, eventTranslator: (input: TSubscriptionEvent) => Promise<TPublicationEvent>) {
    super(subscriptionEventType);
    this.eventTranslator = eventTranslator;
  }
  public async Receive(subscriptionEvent: TSubscriptionEvent): Promise<void> {
    const publicationEvent = await this.eventTranslator(subscriptionEvent);
    if (publicationEvent) {
      await publicationEvent.Publish();
    }
    return new Promise((resolve, reject) => resolve());
  }
}

import { Event } from "../../Events/Core/Event";
import { Receiver } from "./Receiver";

export class ContinuationReceiver<TSubscriptionEvent extends Event, TPublicationEvent extends Event> extends Receiver<TSubscriptionEvent> {
  private readonly continuation: (input: TSubscriptionEvent) => TPublicationEvent;
  public constructor(subscriptionEventType: typeof Event, continuation: (input: TSubscriptionEvent) => TPublicationEvent) {
    super(subscriptionEventType);
    this.continuation = continuation;
  }
  public Receive(subscriptionEvent: TSubscriptionEvent): void {
    const publicationEvent = this.continuation(subscriptionEvent);
    if (publicationEvent) {
      publicationEvent.Publish();
    }
  }
}

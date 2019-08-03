import { Event } from "./Event";
import { EventLink } from "./EventLink";
import { ISubscribable } from "./ISubscribable";

export abstract class EventChain implements ISubscribable {
  private Chain: Array<EventLink<Event, Event>> = [];
  public Link<TSubscriptionEvent extends Event, TPublicationEvent extends Event>(eventTranslator: EventLink<TSubscriptionEvent, TPublicationEvent>) {
    this.Chain.push(eventTranslator);
  }
  public Subscribe() {
    this.Chain.forEach((link) => {
      link.Subscribe();
    });
  }

  public UnSubscribe() {
    this.Chain.forEach((link) => {
      link.UnSubscribe();
    });
  }
}

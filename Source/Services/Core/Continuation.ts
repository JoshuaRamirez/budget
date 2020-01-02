import { Event } from "../../Events/Core/Event";
import { ContinuationHandler } from "./ContinuationHandler";
import { ISubscriber } from "./ISubscriber";

export abstract class Continuation implements ISubscriber {
  private Continuations: Array<ContinuationHandler<Event, Event>> = [];
  public Link<TSubscriptionEvent extends Event, TPublicationEvent extends Event>(continuationHandler: ContinuationHandler<TSubscriptionEvent, TPublicationEvent>) {
    this.Continuations.push(continuationHandler);
  }
  public Subscribe() {
    this.Continuations.forEach((link) => {
      link.Subscribe();
    });
  }

  public UnSubscribe() {
    this.Continuations.forEach((link) => {
      link.UnSubscribe();
    });
  }
}

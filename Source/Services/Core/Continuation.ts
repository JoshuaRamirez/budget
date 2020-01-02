import { Event } from "../../Events/Core/Event";
import { ContinuationReceiver } from "./ContinuationReceiver";
import { ISubscriber } from "./ISubscriber";

export abstract class Continuation implements ISubscriber {
  private Continuations: Array<ContinuationReceiver<Event, Event>> = [];
  public Link<TSubscriptionEvent extends Event, TPublicationEvent extends Event>(continuationHandler: ContinuationReceiver<TSubscriptionEvent, TPublicationEvent>) {
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

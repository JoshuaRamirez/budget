import { EventStore } from "./EventStore";
import { ISubscriber } from "./ISubscriber";
import { MainEvent } from "./MainEvent";

export class Publisher<TEvent extends MainEvent<TEvent>> {
  public static Subscriptions = {};
  public static Instance = new Publisher();
  public Publish(event: TEvent) {
    EventStore.Instance.Record(event);
    Publisher.Subscriptions[event.EventName].forEach((handler) => handler(event));
  }
  public Subscribe<TSubscriber extends ISubscriber<TEvent>>(eventType: (new () => TEvent),  subscriber: TSubscriber) {
    const eventName = eventType.name;
    const subscriptions = Publisher.Subscriptions[eventName];
    if (!subscriptions) {
      Publisher.Subscriptions[eventName] = [];
    }
    Publisher.Subscriptions[eventName].push(subscriber.Process);
  }
}
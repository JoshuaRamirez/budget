import { Event } from "./Event";
import { EventStore } from "./EventStore";
import { ISubscriber } from "./ISubscriber";

export class Publisher<TEvent extends Event<TEvent>> {
  public static Subscriptions = {};
  public static Instance = new Publisher();
  public Publish(event: TEvent) {
    EventStore.Instance.Record(event);
    if (!Publisher.Subscriptions[event.EventName]) {
      return;
    }
    Publisher.Subscriptions[event.EventName].forEach((handler) => handler(event));
  }
  public Subscribe(
    eventType: (new (x, y) => TEvent),
    subscriber: ISubscriber<TEvent>,
  ) {
    const eventName = eventType.name;
    const subscriptions = Publisher.Subscriptions[eventName];
    if (!subscriptions) {
      Publisher.Subscriptions[eventName] = [];
    }
    Publisher.Subscriptions[eventName].push(subscriber.Process.bind(subscriber));
  }
}

import { IReceiver } from "../../Services/Core/IReceiver";
import { Event } from "./Event";
import { EventStore } from "./EventStore";

export class Publisher<TEvent extends Event> {
  public static Subscriptions = {};
  public static Instance = new Publisher();
  public Publish(event: TEvent) {
    EventStore.Instance.Record(event);
    if (!Publisher.Subscriptions[event.EventName]) {
      return;
    }
    const handlers = Publisher.Subscriptions[event.EventName];
    handlers.forEach(handler => {
      handler(event);
    });
  }
  public Subscribe(eventType: new (x, y) => TEvent, subscriber: IReceiver<TEvent>) {
    const eventName = eventType.name;
    const subscriptions = Publisher.Subscriptions[eventName];
    if (!subscriptions) {
      Publisher.Subscriptions[eventName] = [];
    }
    const handle = subscriber.Receive.bind(subscriber);
    Publisher.Subscriptions[eventName].push(handle);
    return handle;
  }
  public UnSubscribe(eventType: new (x, y) => TEvent, handle: IReceiver<TEvent>) {
    const eventName = eventType.name;
    const subscriptions = Publisher.Subscriptions[eventName];
    if (!subscriptions) {
      return;
    }
    const index = subscriptions.indexOf(handle);
    if (index < 0) {
      return;
    }
    subscriptions.splice(index, 1);
  }
}

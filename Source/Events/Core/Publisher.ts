import { IReceiver } from "../../Services/Core/IReceiver";
import { Event } from "./Event";
import { EventStore } from "./EventStore";

export class Publisher<TEvent extends Event> {
  public static Subscriptions = {};
  public static Instance = new Publisher();
  public async Publish(event: TEvent): Promise<void> {
    await EventStore.Instance.Record(event);
    if (!Publisher.Subscriptions[event.EventName]) {
      return new Promise((resolve, reject) => resolve());
    }
    const handlers = Publisher.Subscriptions[event.EventName];
    for (const handler of handlers) {
      await handler(event);
    }
    return new Promise((resolve, reject) => resolve());
  }
  public Subscribe(eventType: new (x, y) => TEvent, subscriber: IReceiver<TEvent>): any {
    const eventName = eventType.name;
    const subscriptions = Publisher.Subscriptions[eventName];
    if (!subscriptions) {
      Publisher.Subscriptions[eventName] = [];
    }
    const handle = subscriber.Receive.bind(subscriber);
    Publisher.Subscriptions[eventName].push(handle);
    return handle;
  }
  public UnSubscribe(eventType: new (x, y) => TEvent, handle: IReceiver<TEvent>): void {
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

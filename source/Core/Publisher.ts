import { EventDataStore } from "../data/eventDataStore";
import { MainEvent } from "./MainEvent";

export abstract class Publisher<TEvent extends MainEvent<TEvent>> {
  public static Subscriptions = {};
  public Publish(event: TEvent) {
    EventDataStore.Instance.Record(event);
    Publisher.Subscriptions[event.EventName].forEach((handler) => handler(event));
  }
  public Subscribe(eventName: string,  subscription: (event: TEvent) => void) {
    const subscriptions = Publisher.Subscriptions[eventName];
    if (!subscriptions) {
      Publisher.Subscriptions[eventName] = [];
    }
    Publisher.Subscriptions[eventName].push(subscription);
  }
}

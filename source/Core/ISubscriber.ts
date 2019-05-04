import { Event } from "./Event";

export interface ISubscriber<TEvent extends Event> {
  Process(event: TEvent): void;
  Subscribe();
}

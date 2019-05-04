import { Event } from "./Event";

export interface ISubscriber<TEvent extends Event<TEvent>> {
  Process(event: TEvent): void;
  Subscribe();
}

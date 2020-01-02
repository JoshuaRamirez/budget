import { Event } from "../../Events/Core/Event";
import { ISubscribable } from "./ISubscribable";

export interface ISubscriber<TEvent extends Event> extends ISubscribable {
  Receive(event: TEvent): void;
}

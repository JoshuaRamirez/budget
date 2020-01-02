import { Event } from "../../Events/Core/Event";
import { ISubscribable } from "./ISubscribable";

export interface IReceiver<TEvent extends Event> extends ISubscribable {
  Receive(event: TEvent): void;
}

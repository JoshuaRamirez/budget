import { Event } from "../../Events/Core/Event";
import { ISubscriber } from "./ISubscriber";

export interface IReceiver<TEvent extends Event> extends ISubscriber {
  Receive(event: TEvent): Promise<void>;
}

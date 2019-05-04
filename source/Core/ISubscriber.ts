import { MainEvent } from "./MainEvent";

export interface ISubscriber<TEvent extends MainEvent<TEvent>> {
  Process(event: TEvent): void;
  Subscribe();
}

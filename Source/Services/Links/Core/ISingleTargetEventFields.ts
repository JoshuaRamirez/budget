import { Event } from "../../../Events/Core/Event";

export interface ISingleTargetEventFields<TEvent extends Event> {
  readonly TargetIdFieldName: keyof TEvent;
}

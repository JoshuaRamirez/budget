import { Event } from "../../../Events/Core/Event";

export interface IDeclaration<TEvent extends Event> {
  readonly EventType: any;
  readonly SubjectType: any;
  readonly TargetType: any;
  readonly SubjectIdFieldName: keyof TEvent;
}


import { Event } from "./Event";
import { Handler } from "./Handler";

export interface IManyToManyDeclaration<TTargetEvent> {
  EventType: any;
  SubjectType: any;
  SubjectIdFieldName: string;
  SubjectAggregationFieldName: string;
  TargetType: any;
  TargetIdFieldName: string;
  TargetAggregationFieldName: string;
  TargetEvent: TTargetEvent; // Why is this type a thing?
}

export abstract class LinkManyToManyService<TSubscribingEvent extends Event, TTargetEvent extends Event> extends Handler<TSubscribingEvent> {
  private readonly declaration;
  protected constructor(declaration: IManyToManyDeclaration<TTargetEvent>) {
    super(declaration.EventType);
    this.declaration = declaration;
  }
  public Handle(event: TSubscribingEvent): void {
    if (!event[this.declaration.SubjectIdFieldName]) {
      return;
    }
    const subjectId = event[this.declaration.SubjectIdFieldName];
    if (!subjectId) {
      return;
    }
    if (!this.declaration.TargetAggregationFieldName) {
      return;
    }
    const targetAggregationIds: any[] = event[this.declaration.TargetAggregationFieldName];
    if (!targetAggregationIds) {
       return;
    }
    if (!targetAggregationIds.length) {
      return;
    }
    targetAggregationIds.forEach((target) => {
      const targetId = target.Id;
      this.declaration.TargetEvent[this.declaration.SubjectIdFieldName] = subjectId;
      this.declaration.TargetEvent[this.declaration.TargetIdFieldName] = targetId;
      this.declaration.TargetEvent.Publish();
    });

  }
}

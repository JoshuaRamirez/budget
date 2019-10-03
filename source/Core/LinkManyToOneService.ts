import { Event } from "./Event";
import { Handler } from "./Handler";
import { ProjectionStore } from "./ProjectionStore";

export interface IManyToOneDeclaration {
  EventType: any;
  SubjectType: any;
  SubjectIdFieldName: string;
  SubjectAggregationFieldName: string;
  TargetType: any;
  TargetIdFieldName: string;
}

// Link Subject to Target where the Target has many Subjects
export abstract class LinkManyToOneService<TSubscribingEvent extends Event> extends Handler<TSubscribingEvent> {

  private readonly EventType: any;
  private readonly SubjectType: any;
  private readonly SubjectIdFieldName: string;
  private readonly SubjectAggregationFieldName: string;
  private readonly TargetType: any;
  private readonly TargetIdFieldName: string;

  protected constructor(declaration: IManyToOneDeclaration) {
    super(declaration.EventType);
    this.TargetIdFieldName = declaration.TargetIdFieldName;
    this.TargetType = declaration.TargetType;
    this.SubjectAggregationFieldName = declaration.SubjectAggregationFieldName;
    this.SubjectIdFieldName = declaration.SubjectIdFieldName;
    this.SubjectType = declaration.SubjectType;
    this.EventType = declaration.EventType;
  }
  public Handle(event: TSubscribingEvent): void {
    if (!event[this.SubjectIdFieldName]) {
      return;
    }
    const subjectId = event[this.SubjectIdFieldName];
    if (!subjectId) {
      return;
    }
    const subjectProjection = ProjectionStore.Instance.GetProjection(this.SubjectType, subjectId);
    if (!subjectProjection) {
      return;
    }
    const targetId = subjectProjection[this.TargetIdFieldName];
    if (!targetId) {
      return;
    }
    const targetProjection = ProjectionStore.Instance.GetProjection(this.TargetType, targetId);
    if (!targetProjection) {
      return;
    }
    targetProjection[this.SubjectAggregationFieldName].push(subjectProjection.Id);
    targetProjection.Update();
  }
}

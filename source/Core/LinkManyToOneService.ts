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
  private readonly declaration: IManyToOneDeclaration;
  protected constructor(declaration: IManyToOneDeclaration) {
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
    const subjectProjection = ProjectionStore.Instance.GetProjection(this.declaration.SubjectType, subjectId);
    if (!subjectProjection) {
      return;
    }
    const targetId = subjectProjection[this.declaration.TargetIdFieldName];
    if (!targetId) {
      return;
    }
    const targetProjection = ProjectionStore.Instance.GetProjection(this.declaration.TargetType, targetId);
    if (!targetProjection) {
      return;
    }
    targetProjection[this.declaration.SubjectAggregationFieldName].push(subjectProjection.Id);
    targetProjection.Update();
  }
}

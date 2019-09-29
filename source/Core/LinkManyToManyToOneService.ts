import { Event } from "./Event";
import { Handler } from "./Handler";
import { ProjectionStore } from "./ProjectionStore";

export abstract class LinkManyToManyToOneService<TSubscribingEvent extends Event> extends Handler<TSubscribingEvent> {
  protected constructor(
    private readonly EventType: any,
    private readonly SubjectType: any,
    private readonly SubjectIdFieldName: string,
    private readonly SubjectAggregationFieldName: string,
    private readonly TargetType: any,
    private readonly TargetIdFieldName: string,
  ) {
    super(EventType);
  }
  public Handle(event: TSubscribingEvent): void {
    if (!event[this.SubjectIdFieldName]) {
      return;
    }
    const subjectId = event[this.SubjectIdFieldName];
    if (!subjectId) {
      return;
    }
    const targetId = event[this.TargetIdFieldName];
    if (!targetId) {
      return;
    }
    const targetProjection = ProjectionStore.Instance.GetProjection(this.TargetType, targetId);
    if (!targetProjection) {
      return;
    }
    targetProjection[this.SubjectAggregationFieldName].push(this.SubjectIdFieldName);
    targetProjection.Update();
  }
}

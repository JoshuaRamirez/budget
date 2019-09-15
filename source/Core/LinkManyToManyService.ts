import { Event } from "./Event";
import { Handler } from "./Handler";

export abstract class LinkManyToManyService<TSubscribingEvent extends Event, TTargetEvent extends Event> extends Handler<TSubscribingEvent> {
  protected constructor(
    private readonly EventType: any,
    private readonly SubjectType: any,
    private readonly SubjectIdFieldName: string,
    private readonly SubjectAggregationFieldName: string,
    private readonly TargetType: any,
    private readonly TargetIdFieldName: string,
    private readonly TargetAggregationFieldName: string,
    private readonly TargetEvent: TTargetEvent,
  ) {
    super(EventType);
  }
  public Process(event: TSubscribingEvent): void {
    if (!event[this.SubjectIdFieldName]) {
      return;
    }
    const subjectId = event[this.SubjectIdFieldName];
    if (!subjectId) {
      return;
    }
    if (!this.TargetAggregationFieldName) {
      return;
    }
    const targetAggregationIds: any[] = event[this.TargetAggregationFieldName];
    if (!targetAggregationIds) {
       return;
    }
    if (!targetAggregationIds.length) {
      return;
    }
    targetAggregationIds.forEach((target) => {
      const targetId = target.Id;
      this.TargetEvent[this.SubjectIdFieldName] = subjectId;
      this.TargetEvent[this.TargetIdFieldName] = targetId;
      this.TargetEvent.Publish();
    });

  }
}

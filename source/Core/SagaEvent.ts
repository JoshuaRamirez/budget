import { Event } from "./Event";

export abstract class SagaEvent extends Event {
  public readonly SagaId: any;
  public readonly SagaName: string;
  protected constructor(eventName: string, sagaName: string, sagaId: any) {
    super(eventName);
    this.SagaName = sagaName;
    this.SagaId = sagaId;
  }
  public abstract Publish();
}

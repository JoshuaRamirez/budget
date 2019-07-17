import { Event } from "./Event";

export abstract class SagaEvent extends Event {
  public readonly SagaId: any;
  public readonly SagaName: string;
  protected constructor(sagaName: string, sagaId: any) {
    super();
    this.SagaName = sagaName;
    this.SagaId = sagaId;
  }
  public abstract Publish();
}

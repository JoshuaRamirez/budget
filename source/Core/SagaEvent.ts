import { MainEvent } from "./MainEvent";

export abstract class SagaEvent<TEvent extends SagaEvent<TEvent>> extends MainEvent<TEvent> {
  public SagaId: any;
  public SagaName: string;
  protected constructor(eventName: string, sagaName: string, sagaId: any) {
    super(eventName);
    this.SagaName = sagaName;
    this.SagaId = sagaId;
  }
  public abstract Publish();
}

import { MainEvent } from "./MainEvent";

export abstract class SagaEvent<TEvent extends SagaEvent<TEvent>> extends MainEvent<TEvent> {
  public SagaId: any;
  public SagaName: string;
  public abstract Publish();
}

import { MainEvent } from "./MainEvent";

export abstract class SagaEvent<TEvent extends SagaEvent<TEvent>> extends MainEvent<TEvent> {
  // TODO: Create a constructor that takes in the SagaId and SagaName
  public SagaId: any;
  public SagaName: string;
  public abstract Publish();
}

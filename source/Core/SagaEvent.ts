import { MainEvent } from "./MainEvent";

export class SagaEvent<TEvent extends SagaEvent<TEvent>> extends MainEvent<TEvent> {
  public SagaId: any;
}

import { Id } from "./Id";
import { SagaStore } from "./SagaStore";

export abstract class Saga {
  public readonly Id: any;
  public readonly Name: string;
  protected constructor(sagaName: string) {
    this.Name = sagaName;
    this.Id = Id.Generate();
  }
  public Save() {
    SagaStore.Instance.SaveSaga(this);
  }
}

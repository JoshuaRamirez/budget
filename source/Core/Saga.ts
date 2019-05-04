import { Id } from "./Id";
import { SagaStore } from "./SagaStore";

export abstract class Saga {
  public Id: any;
  public Name: string;
  protected constructor(sagaName: string) {
    this.Name = sagaName;
    this.Id = Id.Generate();
  }
  public Save() {
    SagaStore.Instance.SaveSaga(this);
  }
}

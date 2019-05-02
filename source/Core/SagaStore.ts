import { Saga } from "./Saga";

export class SagaStore {
  public static Instance = new SagaStore();
  private sagas: Saga[] = [];
  public SaveSaga<TSaga extends Saga>(saga: TSaga): void {
    this.sagas.push(saga);
  }
  public GetSaga<TSaga extends Saga>(sagaId: number): TSaga {
    let foundSaga = null;
    this.sagas.forEach((saga) => {
      if (saga.Id === sagaId) { foundSaga = saga; }
    });
    return foundSaga;
  }
}

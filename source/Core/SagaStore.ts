import { Id } from "./Id";

export class SagaStore {
  public static Instance = new SagaStore();
  private sagas = [];
  public SaveSaga(sagaName: string, sagaData) {
    const saga = {
      sagaData,
      sagaId: Id.Generate(),
      sagaName,
    };
    if (!this.sagas[sagaName]) {
      this.sagas[sagaName] = [];
    }
    this.sagas[sagaName].push(saga);
    return saga;
  }
  public GetSaga(sagaName, sagaId) {
    let foundSaga = null;
    if (sagaName) {
      if (!this.sagas[sagaName]) {
        return undefined;
      }
      this.sagas[sagaName].forEach((saga) => {
        if (saga.sagaId === sagaId) { foundSaga = saga; }
      });
    }
    return foundSaga;
  }
}

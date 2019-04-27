const factory = () => {

  const sagas = [];

  const saveSaga = (sagaName, sagaData) => {
    const saga = {
      sagaId: Date.now(),
      sagaName: sagaName,
      sagaData: sagaData,
    };
    if(!sagas[sagaName]){
      sagas[sagaName] = [];
    }
    sagas[sagaName].push(saga);
    return saga;
  };

  const getSaga = (sagaName, sagaId) => {
    let foundSaga = null;
    if(sagaName){
      if(!sagas[sagaName]){
        return undefined;
      }
      sagas[sagaName].forEach(saga => {
        if(saga.sagaId === sagaId) foundSaga = saga;
      });
    }
    return foundSaga;
  };

  return {
    saveSaga: saveSaga,
    getSaga: getSaga,
  };

};

const singleton = factory();

export {singleton as sagaStore};

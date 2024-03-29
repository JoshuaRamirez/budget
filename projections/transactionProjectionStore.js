const factory = () => {

  const projections = [];

  const contract = () => {
    return {
      amount: undefined,
      destination: undefined,
      ledger: undefined,
      type: undefined,
      source: undefined,
    };
  };

  const project = (data) => {
    const newProjection = {
      amount: data.amount,
      destination: data.destination,
      id: Date.now(),
      ledger: data.ledger,
      source: data.source,
      type: data.type,
    };
    projections.push(newProjection);
    return newProjection;
  };

  project.contract = contract;

  const getById = (id) => {
    return projections.find((projection) => projection.id === id);
  };

  return {
    all: projections,
    getById: getById,
    project: project,
  }

};

const singleton = factory();

export {singleton as transactionProjectionStore};

const factory = () => {

  const projections = [];

  const contract = () => {
    return {
      account: undefined,
      balance: undefined,
      transactions: undefined,
      type: undefined,
    };
  };

  const project = (data) => {
    const newProjection = {
      account: data.account,
      balance: data.balance,
      id: Date.now(),
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

export {singleton as ledgerProjectionStore};

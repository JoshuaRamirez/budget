const factory = () => {

  const projections = [];

  const contract = () => {
    return {
      amount: undefined,
      ledgerId: undefined,
      transactionId: undefined,
    };
  };

  const project = (data) => {
    const newProjection = {
      amount: data.amount,
      id: Date.now(),
      ledgerId: data.ledgerId,
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
    getById,
    project,
  };

};

const singleton = factory();

export {singleton as allocationProjectionStore};

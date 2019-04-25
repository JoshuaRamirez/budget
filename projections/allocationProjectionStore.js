const factory = () => {

  const projections = [];

  const contract = () => {
    return {
      amount: undefined,
      ledgerId: undefined,
    };
  };

  const project = (data) => {
    const newProjection = {
      id: Date.now(),
      amount: data.amount,
      ledgerId: data.ledgerId
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

export {singleton as allocationProjectionStore};

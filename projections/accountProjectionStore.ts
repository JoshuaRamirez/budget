const factory = () => {

  const projections = [];

  const contract = () => {
    return {
      name: undefined,
      type: undefined,
    };
  };

  const project = (data) => {
    const newProjection = {
      id: Date.now(),
      name: data.name,
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
    getById,
    project,
  };

};

const singleton = factory();

export {singleton as accountProjectionStore};

import {allocationProjectionStore} from "../projections/allocationProjectionStore";

const factory = () => {

  const process = (parameters) => {

    const createAllocationProjection = () => {
      const newAllocation = allocationProjectionStore.project.contract();
      newAllocation.amount = parameters.amount;
      newAllocation.ledgerId = parameters.ledgerId;
      allocationProjectionStore.project(newAllocation);
    };

    createAllocationProjection();


  };

  process.contract = () => {
    return {
      amount: undefined,
      ledgerId: undefined
    }
  };

  return {
    process: process
  };

};

const singleton = factory();

export {singleton as createAllocationService}

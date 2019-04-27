import {newTransactionCreatedPublisher} from "../publishers/newTransactionCreatedPublisher";
import {createAllocationService} from "../services/createAllocationService";

const factory = () => {

  const process = (parameters) => {
    createAllocationService.process(parameters);
  };

  const subscribe = () => {
    newTransactionCreatedPublisher.subscribe(process);
  };

  return {
    process,
    subscribe,
  };

};

const singleton = factory();

export {singleton as newTransactionCreatedSubscriber};

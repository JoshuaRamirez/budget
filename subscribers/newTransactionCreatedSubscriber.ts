import {createAllocationService} from "../services/createAllocationService";
import {newTransactionCreatedPublisher} from "../publishers/newTransactionCreatedPublisher";

const factory = () => {

  const process = (parameters) => {
    createAllocationService.process(parameters);
  };

  const subscribe = () => {
    newTransactionCreatedPublisher.subscribe(process);
  };

  return {
    process: process,
    subscribe: subscribe
  };

};

const singleton = factory();

export {singleton as newTransactionCreatedSubscriber}

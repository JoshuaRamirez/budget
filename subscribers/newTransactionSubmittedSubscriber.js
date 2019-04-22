import {createTransactionService} from "../services/createTransactionService";
import {newTransactionSubmittedPublisher} from "../publishers/newTransactionSubmittedPublisher";

const factory = () => {

  const process = (parameters) => {
    createTransactionService.process(parameters);
  };

  const subscribe = () => {
    newTransactionSubmittedPublisher.subscribe(process);
  };

  return {
    process: process,
    subscribe: subscribe
  };

};

const singleton = factory();

export {singleton as newTransactionSubmittedSubscriber}

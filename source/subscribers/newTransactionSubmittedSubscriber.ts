import {newTransactionSubmittedPublisher} from "../publishers/newTransactionSubmittedPublisher";
import {createTransactionService} from "../services/createTransactionService";

const factory = () => {

  const process = (parameters) => {
    createTransactionService.process(parameters);
  };

  const subscribe = () => {
    newTransactionSubmittedPublisher.subscribe(process);
  };

  return {
    process,
    subscribe,
  };

};

const singleton = factory();

export {singleton as newTransactionSubmittedSubscriber};

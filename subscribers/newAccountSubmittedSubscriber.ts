import {newAccountSubmittedPublisher} from "../publishers/newAccountSubmittedPublisher";
import {createAccountService} from "../services/createAccountService";

const factory = () => {

  const process = (parameters) => {
    createAccountService.process(parameters);
  };

  const subscribe = () => {
    newAccountSubmittedPublisher.subscribe(process);
  };

  return {
    process,
    subscribe,
  };

};

const singleton = factory();

export {singleton as newAccountSubmittedSubscriber};

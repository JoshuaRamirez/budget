import {newAllocationSubmittedPublisher} from "../publishers/newAllocationSubmittedPublisher";
import {createAllocationService} from "../services/createAllocationService";

const factory = () => {

  const process = (parameters) => {
    createAllocationService.process(parameters);
  };

  const subscribe = () => {
    newAllocationSubmittedPublisher.subscribe(process);
  };

  return {
    process,
    subscribe,
  };

};

const singleton = factory();

export {singleton as newAllocationSubmittedSubscriber};

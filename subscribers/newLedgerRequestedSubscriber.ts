import {newLedgerRequestedPublisher} from "../publishers/newLedgerRequestedPublisher";
import {createLedgerService} from "../services/createLedgerService";

const factory = () => {

  const process = (parameters) => {
    createLedgerService.process(parameters);
  };

  const subscribe = () => {
    newLedgerRequestedPublisher.subscribe(process);
  };

  return {
    process,
    subscribe,
  };

};

const singleton = factory();

export {singleton as newLedgerRequestedSubscriber};

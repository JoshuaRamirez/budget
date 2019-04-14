import {ledgerProjectionStore} from "../projections/ledgerProjectionStore";
import {newLedgerRequestedPublisher} from "../publishers/newLedgerRequestedPublisher";

const factory = () => {

  const process = (parameters) => {

    const newLedger = ledgerProjectionStore.project.contract();
    newLedger.account = parameters.account;
    newLedger.balance = 0;
    newLedger.transactions = [];
    newLedger.type = parameters.type;
    ledgerProjectionStore.project(newLedger);

  };

  const subscribe = () => {
    newLedgerRequestedPublisher.subscribe(process);
  };

  return {
    process: process,
    subscribe: subscribe
  };

};

const singleton = factory();

export {singleton as ledgerCreator}

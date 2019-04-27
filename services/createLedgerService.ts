import {ledgerProjectionStore} from "../projections/ledgerProjectionStore";

const factory = () => {

  const process = (parameters) => {

    const createLedgerProjection = () => {
      const newLedger = ledgerProjectionStore.project.contract();
      newLedger.account = parameters.account;
      newLedger.balance = 0;
      newLedger.transactions = [];
      newLedger.type = parameters.type;
      ledgerProjectionStore.project(newLedger);
    };

    createLedgerProjection();

  };

  process.contract = () => {
    return {
      account: undefined,
      type: undefined,
    };
  };

  return {
    process: process
  };

};

const singleton = factory();

export {singleton as createLedgerService}


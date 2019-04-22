import {transactionProjectionStore} from "../projections/transactionProjectionStore";

const factory = () => {

  const process = (parameters) => {

    const createTransactionProjection = () => {
      const newTransaction = transactionProjectionStore.project.contract();
      newTransaction.amount = parameters.amount;
      newTransaction.destination = parameters.destination;
      newTransaction.ledger = parameters.ledger;
      newTransaction.source = parameters.source;
      newTransaction.type = parameters.type;
      transactionProjectionStore.project(newTransaction);
      parameters.ledger.balance -= newTransaction.amount;
    };

    createTransactionProjection();

  };

  process.contract = () => {
    return {
      source: undefined,
      destination: undefined,
      type: undefined,
      amount: undefined,
      ledger: undefined,
    };
  };

  return {
    process: process
  };

};

const singleton = factory();

export {singleton as createTransactionService}


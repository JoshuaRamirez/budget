import {transactionProjectionStore} from "../projections/transactionProjectionStore";
import {newTransactionCreatedPublisher} from "../publishers/newTransactionCreatedPublisher";
import {ledgerProjectionStore} from "../projections/ledgerProjectionStore";

const factory = () => {

  const process = (parameters) => {

    let newTransaction = undefined;

    const createTransactionProjection = () => {
      const projection = transactionProjectionStore.project.contract();
      projection.amount = parameters.amount;
      projection.destination = parameters.destination;
      projection.ledgerId = parameters.ledgerId;
      projection.source = parameters.source;
      projection.type = parameters.type;
      newTransaction = transactionProjectionStore.project(projection);
    };

    const publishTransactionCreated = () => {
      const eventData = newTransactionCreatedPublisher.publish.contract();
      eventData.transaction = newTransaction;
      eventData.sagaId = parameters.sagaId;
      newTransactionCreatedPublisher.publish(eventData);
    };

    const updateLedgerProjection = () => {
      const ledgerId = parameters.ledgerId;
      const ledger = ledgerProjectionStore.getById(ledgerId);
      ledger.balance -= newTransaction.amount;
    };

    createTransactionProjection();
    updateLedgerProjection();
    publishTransactionCreated();

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


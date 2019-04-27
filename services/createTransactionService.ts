import {ledgerProjectionStore} from "../projections/ledgerProjectionStore";
import {transactionProjectionStore} from "../projections/transactionProjectionStore";
import {newTransactionCreatedPublisher} from "../publishers/newTransactionCreatedPublisher";

const factory = () => {

  const process = (parameters) => {

    let newTransaction;

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
      amount: undefined,
      destination: undefined,
      ledger: undefined,
      source: undefined,
      type: undefined,
    };
  };

  return {
    process,
  };

};

const singleton = factory();

export {singleton as createTransactionService};


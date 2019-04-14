import {transactionProjectionStore} from "../projections/transactionProjectionStore";
import {newTransactionSubmittedPublisher} from "../publishers/newTransactionSubmittedPublisher";

const factory = () => {

  const process = (newTransactionSubmitted) => {

    const newTransaction = transactionProjectionStore.project.contract();
    newTransaction.amount = newTransactionSubmitted.amount;
    newTransaction.destination = newTransactionSubmitted.destination;
    newTransaction.ledger = newTransactionSubmitted.ledger;
    newTransaction.source = newTransactionSubmitted.source;
    newTransaction.type = newTransactionSubmitted.type;
    transactionProjectionStore.project(newTransaction);

    newTransactionSubmitted.ledger.balance -= newTransaction.amount;

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

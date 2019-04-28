import {newTransactionCreatedPublisher} from "../publishers/newTransactionCreatedPublisher";

const factory = () => {

  const ledgerProjectionStore = new LedgerProjectionStore();
  const transactionProjectionStore = new TransactionProjectionStore();

  const process = (parameters) => {

    let newTransaction;

    const createTransactionProjection = () => {
      const projection = new TransactionProjection();
      projection.Amount = parameters.amount;
      projection.Destination = parameters.destination;
      projection.LedgerId = parameters.ledgerId;
      projection.Source = parameters.source;
      projection.Type = parameters.type;
      newTransaction = transactionProjectionStore.Project(projection);
    };

    const publishTransactionCreated = () => {
      const eventData = newTransactionCreatedPublisher.publish.contract();
      eventData.transaction = newTransaction;
      eventData.sagaId = parameters.sagaId;
      newTransactionCreatedPublisher.publish(eventData);
    };

    const updateLedgerProjection = () => {
      const ledgerId = parameters.ledgerId;
      const ledger = ledgerProjectionStore.GetById(ledgerId);
      ledger.Balance -= newTransaction.amount;
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


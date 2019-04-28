const factory = () => {

  const ledgerProjectionStore = new LedgerProjectionStore();

  const process = (parameters) => {

    const createLedgerProjection = () => {
      const newLedger = new LedgerProjection();
      newLedger.Account = parameters.account;
      newLedger.Balance = 0;
      newLedger.Transactions = [];
      newLedger.Type = parameters.type;
      ledgerProjectionStore.Project(newLedger);
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
    process,
  };

};

const singleton = factory();

export {singleton as createLedgerService};


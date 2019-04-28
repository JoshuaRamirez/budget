import {newLedgerRequestedPublisher} from "../publishers/newLedgerRequestedPublisher";

const factory = () => {

  const accountProjectionStore = new AccountProjectionStore();

  const process = (parameters) => {

    const createLedgerProjection = () => {
      const contract = new AccountProjectionRequest();
      contract.Name = parameters.name;
      contract.Type = parameters.type;
      const projection = accountProjectionStore.Project(contract);
      return projection;
    };

    const requestNewLedger = (account) => {
      const newLedgerRequestedContract = newLedgerRequestedPublisher.publish.contract();
      newLedgerRequestedContract.account = account;
      newLedgerRequestedContract.type = "Account";
      newLedgerRequestedPublisher.publish(newLedgerRequestedContract);
    };

    const newAccount = createLedgerProjection();
    requestNewLedger(newAccount);

  };

  process.contract = () => {
    return {
      name: undefined,
      type: undefined,
    };
  };

  return {
    process,
  };

};

const singleton = factory();

export {singleton as createAccountService};

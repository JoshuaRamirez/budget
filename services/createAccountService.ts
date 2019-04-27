import {accountProjectionStore} from "../projections/accountProjectionStore";
import {newLedgerRequestedPublisher} from "../publishers/newLedgerRequestedPublisher";

const factory = () => {

  const process = (parameters) => {

    const createLedgerProjection = () => {
      let newAccount = accountProjectionStore.project.contract();
      newAccount.name = parameters.name;
      newAccount.type = parameters.type;
      newAccount = accountProjectionStore.project(newAccount);
      return newAccount;
    };

    const requestNewLedger = (newAccount) => {
      const newLedgerRequestedContract = newLedgerRequestedPublisher.publish.contract();
      newLedgerRequestedContract.account = newAccount;
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

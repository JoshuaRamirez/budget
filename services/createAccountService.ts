import {accountProjectionStore} from "../projections/accountProjectionStore";
import {newLedgerRequestedPublisher} from "../publishers/newLedgerRequestedPublisher";

const factory = () => {

  const process = (parameters) => {

    const createLedgerProjection = () => {
      let account = accountProjectionStore.project.contract();
      account.name = parameters.name;
      account.type = parameters.type;
      account = accountProjectionStore.project(account);
      return account;
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

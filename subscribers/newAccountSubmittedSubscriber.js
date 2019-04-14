import {newAccountSubmittedPublisher} from "../publishers/newAccountSubmittedPublisher";
import {newLedgerRequestedPublisher} from "../publishers/newLedgerRequestedPublisher";
import {accountProjectionStore} from "../projections/accountProjectionStore";

const factory = () => {

  const process = (parameters) => {

    let newAccount = accountProjectionStore.project.contract();
    newAccount.name = parameters.name;
    newAccount.type = parameters.type;
    newAccount = accountProjectionStore.project(newAccount);

    const newLedgerRequestedData = newLedgerRequestedPublisher.publish.contract();
    newLedgerRequestedData.account = newAccount;
    newLedgerRequestedData.type = "Account";
    newLedgerRequestedPublisher.publish(newLedgerRequestedData);

  };

  const subscribe = () => {
    newAccountSubmittedPublisher.subscribe(process);
  };

  return {
    process: process,
    subscribe: subscribe
  };

};

const singleton = factory();

export {singleton as newAccountSubmittedSubscriber}

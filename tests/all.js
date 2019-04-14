//Services
import {accountCreator} from "../services/accountCreator";
import {ledgerCreator} from "../services/ledgerCreator";
import {transactionCreator} from "../services/transactionCreator";

//Events
import {newTransactionSubmittedPublisher} from "../events/newTransactionSubmittedPublisher";
import {newAccountSubmittedPublisher} from "../events/newAccountSubmittedPublisher";

//Projections
import {accountProjectionStore} from "../projections/accountProjectionStore";
import {ledgerProjectionStore} from "../projections/ledgerProjectionStore";
import {transactionProjectionStore} from "../projections/transactionProjectionStore";

const factory = () => {

  const run = function(){

    accountCreator.subscribe();
    ledgerCreator.subscribe();
    transactionCreator.subscribe();

    const newAccountSubmitted = newAccountSubmittedPublisher.publish.contract();
    newAccountSubmitted.name = "Wells Fargo Checking";
    newAccountSubmitted.type = "Bank";
    newAccountSubmittedPublisher.publish(newAccountSubmitted);

    const newTransaction1 = newTransactionSubmittedPublisher.publish.contract();
    newTransaction1.source = "payer";
    newTransaction1.destination = "payee";
    newTransaction1.amount = 10;
    newTransaction1.type = "purchase";
    newTransaction1.ledger = ledgerProjectionStore.all[0];
    newTransactionSubmittedPublisher.publish(newTransaction1);

    const newTransaction2 = newTransactionSubmittedPublisher.publish.contract();
    newTransaction2.source = "payer";
    newTransaction2.destination = "payee";
    newTransaction2.amount = 14;
    newTransaction2.type = "purchase";
    newTransaction2.ledger = ledgerProjectionStore.all[0];
    newTransactionSubmittedPublisher.publish(newTransaction2);

    console.log(ledgerProjectionStore.all[0]);

    console.log("done!");

  };

  return {
    run: run
  };

};

const singleton = factory();

export {singleton as allTests}

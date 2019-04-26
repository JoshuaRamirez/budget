//Subscribers
import {newAccountSubmittedSubscriber} from "./subscribers/newAccountSubmittedSubscriber";
import {newLedgerRequestedSubscriber} from "./subscribers/newLedgerRequestedSubscriber";
import {newTransactionSubmittedSubscriber} from "./subscribers/newTransactionSubmittedSubscriber";
import {newAllocationSubmittedSubscriber} from "./subscribers/newAllocationSubmittedSubscriber";

//Publishers
import {newTransactionSubmittedPublisher} from "./publishers/newTransactionSubmittedPublisher";
import {newAccountSubmittedPublisher} from "./publishers/newAccountSubmittedPublisher";
import {newAllocationSubmittedPublisher} from "./publishers/newAllocationSubmittedPublisher";

//Projections
import {accountProjectionStore} from "./projections/accountProjectionStore";
import {ledgerProjectionStore} from "./projections/ledgerProjectionStore";
import {transactionProjectionStore} from "./projections/transactionProjectionStore";
import {allocationProjectionStore} from "./projections/allocationProjectionStore";
import {newTransactionCreatedPublisher} from "./publishers/newTransactionCreatedPublisher";
import {newTransactionCreatedSubscriber} from "./subscribers/newTransactionCreatedSubscriber";

const factory = () => {

  const publishNewAllocation = (ledgerId, amount) => {
    newAllocationSubmittedPublisher.publish({
      amount: amount,
      ledgerId: ledgerId,
    });
    if(allocationProjectionStore.all.length !== 1) {
      throw "Test Failed";
    }
    if(allocationProjectionStore.all[0].ledgerId !== ledgerProjectionStore.all[0].id) {
      throw "Test Failed";
    }
  };

  const publishNewAccountSubmitted = () => {
    const newAccountSubmitted = newAccountSubmittedPublisher.publish.contract();
    newAccountSubmitted.name = "Wells Fargo Checking";
    newAccountSubmitted.type = "Bank";
    newAccountSubmittedPublisher.publish(newAccountSubmitted);
  };

  const publishNewTransaction = (amount) => {
    const newTransaction1 = newTransactionSubmittedPublisher.publish.contract();
    newTransaction1.source = "payer";
    newTransaction1.destination = "payee";
    newTransaction1.amount = amount;
    newTransaction1.type = "purchase";
    newTransaction1.ledgerId = ledgerProjectionStore.all[0].id;
    newTransactionSubmittedPublisher.publish(newTransaction1);
  };

  const run = function(){

    newAccountSubmittedSubscriber.subscribe();
    newLedgerRequestedSubscriber.subscribe();
    newTransactionSubmittedSubscriber.subscribe();
    newAllocationSubmittedSubscriber.subscribe();
    newTransactionCreatedSubscriber.subscribe();

    projectionTests();
    publisherTests();
    basicScenario();

  };

  const basicScenario = () => {

    publishNewAccountSubmitted();
    publishNewTransaction(1);
    publishNewTransaction(1);
    publishNewTransaction(1);
    publishNewTransaction(1);
    publishNewTransaction(1);
    const ledgerId = ledgerProjectionStore.all[0].id;
    publishNewAllocation(ledgerId, -10);

    console.log(ledgerProjectionStore.all[0]);

    console.log("done!");
  };

  const projectionTests = () => {

    const projectionStoreIsEmpty = (store) => {
      if(store.all > 0) {
        throw "Test Failed";
      }
    };

    projectionStoreIsEmpty(allocationProjectionStore);
    projectionStoreIsEmpty(accountProjectionStore);
    projectionStoreIsEmpty(transactionProjectionStore);
    projectionStoreIsEmpty(ledgerProjectionStore);

  };

  const publisherTests = () => {



  };



  return {
    run: run
  };

};

const singleton = factory();

export {singleton as allTests}

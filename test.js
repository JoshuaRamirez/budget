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

const factory = () => {

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
    newTransaction1.ledger = ledgerProjectionStore.all[0];
    newTransactionSubmittedPublisher.publish(newTransaction1);
  };

  const run = function(){

    newAccountSubmittedSubscriber.subscribe();
    newLedgerRequestedSubscriber.subscribe();
    newTransactionSubmittedSubscriber.subscribe();
    newAllocationSubmittedSubscriber.subscribe();

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

    console.log(ledgerProjectionStore.all[0]);

    console.log("done!");
  };

  const projectionTests = () => {

    const projectionStoreIsEmpty = (store) => {
      if(store.all > 0) throw "Test Failed";
    };

    const allocationProjectionStoreProjects = () => {
      const projection = allocationProjectionStore.project.contract();
      projection.amount = 1;
      projection.ledgerId = 1;
      allocationProjectionStore.project(projection);
      if(allocationProjectionStore.all.length === 0) throw "Test Failed";
      if(allocationProjectionStore.all[0].ledgerId !== 1) throw "Test Failed";
    };

    projectionStoreIsEmpty(allocationProjectionStore);
    projectionStoreIsEmpty(accountProjectionStore);
    projectionStoreIsEmpty(transactionProjectionStore);
    projectionStoreIsEmpty(ledgerProjectionStore);

    allocationProjectionStoreProjects();

  };

  const publisherTests = () => {

    const newAllocationPublicationWorks = () => {
      newAllocationSubmittedPublisher.publish({
        amount: 1,
        ledgerId: 2,
      });
      if(allocationProjectionStore.all.length !== 2) throw "Test Failed";
      if(allocationProjectionStore.all[1].ledgerId !== 2) throw "Test Failed";
    };

    newAllocationPublicationWorks();

  };



  return {
    run: run
  };

};

const singleton = factory();

export {singleton as allTests}

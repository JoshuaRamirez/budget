// Subscribers
import {newAccountSubmittedSubscriber} from "./subscribers/newAccountSubmittedSubscriber";
import {newAllocationSubmittedSubscriber} from "./subscribers/newAllocationSubmittedSubscriber";
import {newLedgerRequestedSubscriber} from "./subscribers/newLedgerRequestedSubscriber";
import {newTransactionSubmittedSubscriber} from "./subscribers/newTransactionSubmittedSubscriber";

// Publishers
import {newAccountSubmittedPublisher} from "./publishers/newAccountSubmittedPublisher";
import {newAllocationSubmittedPublisher} from "./publishers/newAllocationSubmittedPublisher";
import {newTransactionSubmittedPublisher} from "./publishers/newTransactionSubmittedPublisher";

// Projections
import {accountProjectionStore} from "./projections/accountProjectionStore";
import {allocationProjectionStore} from "./projections/allocationProjectionStore";
import {ledgerProjectionStore} from "./projections/ledgerProjectionStore";
import {transactionProjectionStore} from "./projections/transactionProjectionStore";
import {newTransactionCreatedSubscriber} from "./subscribers/newTransactionCreatedSubscriber";

const factory = () => {

  const publishNewAllocation = (ledgerId, amount) => {
    newAllocationSubmittedPublisher.publish({
      amount,
      ledgerId,
    });
    if (allocationProjectionStore.all.length !== 1) {
      throw new Error("Test Failed");
    }
    if (allocationProjectionStore.all[0].ledgerId !== ledgerProjectionStore.all[0].id) {
      throw new Error("Test Failed");
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

  const run = function() {

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
      if (store.all > 0) {
        throw new Error("Test Failed");
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
    run,
  };

};

const singleton = factory();

export {singleton as allTests};

// Subscribers
import {newAccountSubmittedSubscriber} from "./subscribers/newAccountSubmittedSubscriber";
import {newAllocationSubmittedSubscriber} from "./subscribers/newAllocationSubmittedSubscriber";
import {newLedgerRequestedSubscriber} from "./subscribers/newLedgerRequestedSubscriber";
import {newTransactionCreatedSubscriber} from "./subscribers/newTransactionCreatedSubscriber";
import {newTransactionSubmittedSubscriber} from "./subscribers/newTransactionSubmittedSubscriber";

// Publishers
import {newAccountSubmittedPublisher} from "./publishers/newAccountSubmittedPublisher";
import {newAllocationSubmittedPublisher} from "./publishers/newAllocationSubmittedPublisher";
import {newTransactionSubmittedPublisher} from "./publishers/newTransactionSubmittedPublisher";

// Projections
const accountProjectionStore = new AccountProjectionStore();
const allocationProjectionStore = new AllocationProjectionStore();
const ledgerProjectionStore = new LedgerProjectionStore();
const transactionProjectionStore = new TransactionProjectionStore();

const factory = () => {

  const publishNewAllocation = (ledgerId, amount) => {
    newAllocationSubmittedPublisher.publish({
      amount,
      ledgerId,
    });
    if (allocationProjectionStore.Projections.length !== 1) {
      throw new Error("Test Failed");
    }
    if (allocationProjectionStore.Projections[0].LedgerId !== ledgerProjectionStore.Projections[0].Id) {
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
    newTransaction1.ledgerId = ledgerProjectionStore.Projections[0].Id;
    newTransactionSubmittedPublisher.publish(newTransaction1);
  };

  const run = () => {

    newAccountSubmittedSubscriber.subscribe();
    newLedgerRequestedSubscriber.subscribe();
    newTransactionSubmittedSubscriber.subscribe();
    newAllocationSubmittedSubscriber.subscribe();
    newTransactionCreatedSubscriber.subscribe();

    projectionTests();
    basicScenario();

  };

  const basicScenario = () => {

    publishNewAccountSubmitted();
    publishNewTransaction(1);
    publishNewTransaction(1);
    publishNewTransaction(1);
    publishNewTransaction(1);
    publishNewTransaction(1);
    const ledgerId = ledgerProjectionStore.Projections[0].Id;
    publishNewAllocation(ledgerId, -10);

    console.log(ledgerProjectionStore.Projections[0]);

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



  return {
    run,
  };

};

const singleton = factory();

export {singleton as allTests};

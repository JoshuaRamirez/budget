import { Subscriber } from "./Core/Subscriber";
import { AccountRequestedEvent } from "./Events/AccountRequestedEvent";
import { AllocationRequestedEvent } from "./Events/AllocationRequestedEvent";
import { TransactionSubmittedEvent } from "./Events/TransactionSubmittedEvent";
import { AllocationProjectionStore } from "./Projections/AllocationProjection/AllocationProjectionStore";
import { LedgerProjectionStore } from "./Projections/LedgerProjection/LedgerProjectionStore";

export class Test {

  public Run() {

    const subscriber = new Subscriber();
    const allocationProjectionStore = AllocationProjectionStore.Instance;
    const ledgerProjectionStore = LedgerProjectionStore.Instance;

    const publishNewAllocation = (ledgerId, amount) => {
      const allocationRequestedEvent = new AllocationRequestedEvent();
      allocationRequestedEvent.Amount = amount;
      allocationRequestedEvent.LedgerId = ledgerId;
      allocationRequestedEvent.Publish(allocationRequestedEvent);
      if (allocationProjectionStore.Projections.length !== 1) {
        throw new Error("Test Failed: Expected Projection Not Present");
      }
      if (allocationProjectionStore.Projections[0].LedgerId !== ledgerProjectionStore.Projections[0].Id) {
        throw new Error("Test Failed: Expected Id Not Present");
      }
    };

    const publishNewAccountSubmitted = () => {
      const accountRequestedEvent = new AccountRequestedEvent();
      accountRequestedEvent.Name = "Wells Fargo Checking";
      accountRequestedEvent.Type = "Bank";
      accountRequestedEvent.Publish(accountRequestedEvent);
    };

    const publishNewTransaction = (amount) => {
      const transactionSubmittedEvent = new TransactionSubmittedEvent();
      transactionSubmittedEvent.Source = "payer";
      transactionSubmittedEvent.Destination = "payee";
      transactionSubmittedEvent.Amount = amount;
      transactionSubmittedEvent.Type = "purchase";
      transactionSubmittedEvent.LedgerId = ledgerProjectionStore.Projections[0].Id;
      transactionSubmittedEvent.Publish(transactionSubmittedEvent);
    };

    subscriber.Subscribe();
    publishNewAccountSubmitted();
    publishNewTransaction(1);
    publishNewTransaction(1);
    publishNewTransaction(1);
    publishNewTransaction(1);
    publishNewTransaction(1);
    const theLedger = ledgerProjectionStore.Projections[0].Id;
    publishNewAllocation(theLedger, -10);
    console.log(ledgerProjectionStore.Projections[0]);
    console.log("done!");

  }
}

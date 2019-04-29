import { ProjectionStore } from "./Core/ProjectionStore";
import { Subscriber } from "./Core/Subscriber";
import { AccountRequestedEvent } from "./Events/AccountRequestedEvent";
import { AllocationRequestedEvent } from "./Events/AllocationRequestedEvent";
import { TransactionSubmittedEvent } from "./Events/TransactionSubmittedEvent";
import { AllocationProjection } from "./Projections/AllocationProjection";
import { LedgerProjection } from "./Projections/LedgerProjection";

export class Test {

  public Run() {

    const subscriber = new Subscriber();
    const projectionStore = ProjectionStore.Instance;

    const publishNewAllocation = (ledgerId, amount) => {
      const allocationRequestedEvent = new AllocationRequestedEvent();
      allocationRequestedEvent.Amount = amount;
      allocationRequestedEvent.LedgerId = ledgerId;
      allocationRequestedEvent.Publish(allocationRequestedEvent);
      if (projectionStore.GetProjections(AllocationProjection).length !== 1) {
        throw new Error("Test Failed: Expected Projection Not Present");
      }
      const allocationLedgerId = projectionStore.GetProjections(AllocationProjection)[0].LedgerId;
      if (allocationLedgerId !== ledgerId) {
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
      transactionSubmittedEvent.LedgerId = projectionStore.GetProjections(LedgerProjection)[0].Id;
      transactionSubmittedEvent.Publish(transactionSubmittedEvent);
    };

    subscriber.Subscribe();
    publishNewAccountSubmitted();
    publishNewTransaction(1);
    publishNewTransaction(1);
    publishNewTransaction(1);
    publishNewTransaction(1);
    publishNewTransaction(1);
    const theLedger = projectionStore.GetProjections(LedgerProjection)[0];
    const theLedgerId = theLedger.Id;
    publishNewAllocation(theLedgerId, -10);
    console.log(theLedger);
    console.log("done!");

  }
}

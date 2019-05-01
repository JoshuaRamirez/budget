import { ProjectionStore } from "./Core/ProjectionStore";
import { Subscriptions } from "./Core/Subscriptions";
import { AccountRequestedEvent } from "./Events/AccountRequestedEvent";
import { AllocationRequestedEvent } from "./Events/AllocationRequestedEvent";
import { PlannedExpenseRequestedEvent } from "./Events/PlannedExpenseRequestedEvent";
import { TransactionSubmittedEvent } from "./Events/TransactionSubmittedEvent";
import { AllocationProjection } from "./Projections/AllocationProjection";
import { LedgerProjection } from "./Projections/LedgerProjection";
import { PlannedExpenseProjection } from "./Projections/PlannedExpenseProjection";

export class Test {

  public Run() {

    const subscriptions = new Subscriptions();
    const projectionStore = ProjectionStore.Instance;

    const publishNewAllocation = (ledgerId, amount) => {
      const allocationRequestedEvent = new AllocationRequestedEvent();
      allocationRequestedEvent.Amount = amount;
      allocationRequestedEvent.LedgerId = ledgerId;
      allocationRequestedEvent.Publish();
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
      accountRequestedEvent.Publish();
    };

    const publishNewTransaction = (amount) => {
      const transactionSubmittedEvent = new TransactionSubmittedEvent();
      transactionSubmittedEvent.Source = "payer";
      transactionSubmittedEvent.Destination = "payee";
      transactionSubmittedEvent.Amount = amount;
      transactionSubmittedEvent.Type = "purchase";
      transactionSubmittedEvent.LedgerId = projectionStore.GetProjections(LedgerProjection)[0].Id;
      transactionSubmittedEvent.Publish();
    };

    const requestPlannedExpense = () => {
      const event = new PlannedExpenseRequestedEvent();
      event.RepeatPeriod = 1;
      event.RepeatMeasurement = "Weeks";
      event.RepeatCount = -1;
      event.Description = "Testing";
      event.Name = "Test Expense";
      event.Publish();
    };

    subscriptions.Create();
    publishNewAccountSubmitted();
    publishNewTransaction(1);
    publishNewTransaction(1);
    publishNewTransaction(1);
    publishNewTransaction(1);
    publishNewTransaction(1);
    const theLedger = projectionStore.GetProjections(LedgerProjection)[0];
    const theLedgerId = theLedger.Id;
    publishNewAllocation(theLedgerId, -10);
    requestPlannedExpense();
    const plannedExpense = projectionStore.GetProjections(PlannedExpenseProjection)[0];
    console.log(plannedExpense);
    console.log(theLedger);
    console.log("done!");

  }
}

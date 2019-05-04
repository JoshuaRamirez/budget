import { ProjectionStore } from "../../source/Core/ProjectionStore";
import { AccountRequestedEvent } from "../../source/Events/AccountRequestedEvent";
import { AllocationRequestedEvent } from "../../source/Events/AllocationRequestedEvent";
import { PlannedExpenseRequestedEvent } from "../../source/Events/PlannedExpenseRequestedEvent";
import { TransactionSubmittedEvent } from "../../source/Events/TransactionSubmittedEvent";
import { LedgerProjection } from "../../source/Projections/LedgerProjection";

const projectionStore = ProjectionStore.Instance;

// TODO: Rename
export const PublishNewAllocation = (ledgerId, amount) => {
  const allocationRequestedEvent = new AllocationRequestedEvent();
  allocationRequestedEvent.Amount = amount;
  allocationRequestedEvent.LedgerId = ledgerId;
  allocationRequestedEvent.Publish();
};

// TODO: Rename
export const PublishNewAccountSubmitted = () => {
  const accountRequestedEvent = new AccountRequestedEvent();
  accountRequestedEvent.Name = "Wells Fargo Checking";
  accountRequestedEvent.Type = "Bank";
  accountRequestedEvent.Publish();
};

// TODO: Rename
export const PublishNewTransaction = (amount) => {
  const transactionSubmittedEvent = new TransactionSubmittedEvent();
  transactionSubmittedEvent.Source = "payer";
  transactionSubmittedEvent.Destination = "payee";
  transactionSubmittedEvent.Amount = amount;
  transactionSubmittedEvent.Type = "purchase";
  transactionSubmittedEvent.LedgerId = projectionStore.GetProjections(LedgerProjection)[0].Id;
  transactionSubmittedEvent.Publish();
};

export const RequestPlannedExpense = () => {
  const event = new PlannedExpenseRequestedEvent();
  event.RepeatPeriod = 1;
  event.RepeatMeasurement = "Weeks";
  event.RepeatCount = -1;
  event.Description = "Testing";
  event.Name = "Test Expense";
  event.Publish();
};

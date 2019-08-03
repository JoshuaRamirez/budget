import { ProjectionStore } from "../../source/Core/ProjectionStore";
import { AccountRequestedEvent } from "../../source/Events/AccountRequestedEvent";
import { AllocationRequestedEvent } from "../../source/Events/AllocationRequestedEvent";
import { ExpenseRequestedEvent } from "../../source/Events/ExpenseRequestedEvent";
import { PayeeRequestedEvent } from "../../source/Events/PayeeRequestedEvent";
import { PlannedExpenseRequestedEvent } from "../../source/Events/PlannedExpenseRequestedEvent";
import { TransactionRequestedEvent } from "../../source/Events/TransactionRequestedEvent";

export const PublishAllocationRequestedEvent = (transactionId, ledgerId) => {
  const allocationRequestedEvent = new AllocationRequestedEvent();
  allocationRequestedEvent.LedgerId = ledgerId;
  allocationRequestedEvent.TransactionId = transactionId;
  allocationRequestedEvent.Publish();
};

export const PublishAccountRequestedEvent = () => {
  const accountRequestedEvent = new AccountRequestedEvent();
  accountRequestedEvent.AccountName = "Wells Fargo Checking";
  accountRequestedEvent.Type = "Bank";
  accountRequestedEvent.Publish();
};

export const PublishExpenseRequestedEvent = (transactionId, ledgerId, plannedExpenseId = null, payeeId = null) => {
  const expenseRequestedEvent = new ExpenseRequestedEvent();
  expenseRequestedEvent.CategoryId = "CategoryId";
  expenseRequestedEvent.Description = "Description";
  expenseRequestedEvent.LedgerId = ledgerId;
  expenseRequestedEvent.PayeeId = payeeId;
  expenseRequestedEvent.PlannedExpenseId = plannedExpenseId;
  expenseRequestedEvent.TransactionId = transactionId;
  expenseRequestedEvent.Publish();
};

export const PublishTransactionRequestedEvent = (amount, ledgerId) => {
  const transactionRequestedEvent = new TransactionRequestedEvent();
  transactionRequestedEvent.Amount = amount;
  transactionRequestedEvent.LedgerId = ledgerId;
  transactionRequestedEvent.Publish();
};

export const PublishPayeeRequestedEvent = () => {
  const payeeRequestedEvent = new PayeeRequestedEvent();
  payeeRequestedEvent.Description = "Test";
  payeeRequestedEvent.Type = "Test";
  payeeRequestedEvent.Publish();
};

export const RequestPlannedExpenseEvent = () => {
  const event = new PlannedExpenseRequestedEvent();
  event.RepeatPeriod = 1;
  event.RepeatMeasurement = "Weeks";
  event.RepeatCount = -1;
  event.Description = "Testing";
  event.Publish();
};

export const GetLast = (type: any) => {
  const projections = ProjectionStore.Instance.GetProjections(type);
  const last = projections[projections.length - 1];
  return last;
};

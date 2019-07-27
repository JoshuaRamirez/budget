import { AccountRequestedEvent } from "../../source/Events/AccountRequestedEvent";
import { AllocationRequestedEvent } from "../../source/Events/AllocationRequestedEvent";
import { ExpenseRequestedEvent } from "../../source/Events/ExpenseRequestedEvent";
import { PayeeRequestedEvent } from "../../source/Events/PayeeRequestedEvent";
import { PlannedExpenseRequestedEvent } from "../../source/Events/PlannedExpenseRequestedEvent";

export const PublishAllocationRequestedEvent = (ledgerId, amount) => {
  const allocationRequestedEvent = new AllocationRequestedEvent();
  allocationRequestedEvent.Amount = amount;
  allocationRequestedEvent.LedgerId = ledgerId;
  allocationRequestedEvent.Publish();
};

export const PublishAccountRequestedEvent = () => {
  const accountRequestedEvent = new AccountRequestedEvent();
  accountRequestedEvent.AccountName = "Wells Fargo Checking";
  accountRequestedEvent.Type = "Bank";
  accountRequestedEvent.Publish();
};

export const PublishExpenseRequestedEvent = (amount, ledgerId, plannedExpenseId = null, payeeId = null) => {
  const expenseRequestedEvent = new ExpenseRequestedEvent();
  expenseRequestedEvent.Amount = amount;
  expenseRequestedEvent.Category = "Test";
  expenseRequestedEvent.Description = "Test";
  expenseRequestedEvent.LedgerId = ledgerId;
  expenseRequestedEvent.PayeeId = payeeId;
  expenseRequestedEvent.PlannedExpenseId = plannedExpenseId;
  expenseRequestedEvent.Publish();
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

import { AccountCreatedEvent } from "../Source/Events/Created/AccountCreatedEvent";
import { DepositCreatedEvent } from "../Source/Events/Created/DepositCreatedEvent";
import { ExpenseCreatedEvent } from "../Source/Events/Created/ExpenseCreatedEvent";
import { LedgerCreatedEvent } from "../Source/Events/Created/LedgerCreatedEvent";
import { TransactionCreatedEvent } from "../Source/Events/Created/TransactionCreatedEvent";
import { AccountRequestedEvent } from "../Source/Events/Requested/Creation/AccountRequestedEvent";
import { AllocationRequestedEvent } from "../Source/Events/Requested/Creation/AllocationRequestedEvent";
import { ExpenseRequestedEvent } from "../Source/Events/Requested/Creation/ExpenseRequestedEvent";
import { LedgerRequestedEvent } from "../Source/Events/Requested/Creation/LedgerRequestedEvent";
import { PayeeRequestedEvent } from "../Source/Events/Requested/Creation/PayeeRequestedEvent";
import { PlannedExpenseRequestedEvent } from "../Source/Events/Requested/Creation/PlannedExpenseRequestedEvent";
import { PlannedTransactionRequestedEvent } from "../Source/Events/Requested/Creation/PlannedTransactionRequestedEvent";
import { ProposedTransactionRequestedEvent } from "../Source/Events/Requested/Creation/ProposedTransactionRequestedEvent";
import { TransactionRequestedEvent } from "../Source/Events/Requested/Creation/TransactionRequestedEvent";
import { UserRequestedEvent } from "../Source/Events/Requested/Creation/UserRequestedEvent";
import { AccountProjection } from "../Source/Projections/AccountProjection";
import { CategoryProjection } from "../Source/Projections/CategoryProjection";
import { Projection } from "../Source/Projections/Core/Projection";
import { ProjectionStore } from "../Source/Projections/Core/ProjectionStore";
import { DepositProjection } from "../Source/Projections/DepositProjection";
import { ExpenseProjection } from "../Source/Projections/ExpenseProjection";
import { LedgerProjection } from "../Source/Projections/LedgerProjection";
import { PayeeProjection } from "../Source/Projections/PayeeProjection";
import { PayerProjection } from "../Source/Projections/PayerProjection";
import { PlannedDepositProjection } from "../Source/Projections/PlannedDepositProjection";
import { PlannedExpenseProjection } from "../Source/Projections/PlannedExpenseProjection";
import { PlannedTransactionProjection } from "../Source/Projections/PlannedTransactionProjection";
import { ProposedTransactionProjection } from "../Source/Projections/ProposedTransactionProjection";
import { TransactionProjection } from "../Source/Projections/TransactionProjection";
import { UserProjection } from "../Source/Projections/UserProjection";

const newTransactionProjection = () => {
  const transaction = new TransactionProjection();
  transaction.LedgerId = newLedgerProjection().Id;
  transaction.Amount = -1;
  transaction.Project();
  return transaction;
};

const newPlannedExpenseProjection = () => {
  const plannedExpense = new PlannedExpenseProjection();
  plannedExpense.Project();
  return plannedExpense;
};

const newPlannedDepositProjection = () => {
  const plannedDeposit = new PlannedDepositProjection();
  plannedDeposit.Project();
  return plannedDeposit;
};

const newPayeeProjection = () => {
  const payeeProjection = new PayeeProjection();
  payeeProjection.PayeeName = "TestPayeeName";
  payeeProjection.Project();
  return payeeProjection;
};

const newPayerProjection = () => {
  const payerProjection = new PayerProjection();
  payerProjection.PayerName = "TestPayerName";
  payerProjection.Project();
  return payerProjection;
};

const newExpenseProjection = () => {
  const expenseProjection = new ExpenseProjection();
  expenseProjection.PlannedExpenseId = newPlannedExpenseProjection().Id;
  expenseProjection.LedgerId = newLedgerProjection().Id;
  expenseProjection.PayeeId = newPayeeProjection().Id;
  expenseProjection.Project();
  return expenseProjection;
};

const newDepositProjection = () => {
  const depositProjection = new DepositProjection();
  depositProjection.PlannedDepositId = newPlannedDepositProjection().Id;
  depositProjection.LedgerId = newLedgerProjection().Id;
  depositProjection.PayerId = newPayerProjection().Id;
  depositProjection.Project();
  return depositProjection;
};

const newLedgerProjection = () => {
  const ledgerProjection = new LedgerProjection();
  ledgerProjection.AccountId = newAccountProjection().Id;
  ledgerProjection.Project();
  return ledgerProjection;
};

const newAccountProjection = () => {
  const accountProjection = new AccountProjection();
  accountProjection.AccountName = "TestAccountName";
  accountProjection.Type = "TestType";
  accountProjection.UserId = newUserProjection().Id;
  accountProjection.Project();
  return accountProjection;
};

const newUserProjection = () => {
  const userProjection = new UserProjection();
  userProjection.Project();
  return userProjection;
};

const newCategoryProjection = () => {
  const categoryProjection = new CategoryProjection();
  categoryProjection.Project();
  return categoryProjection;
};

export const newPlannedTransaction = () => {
  const plannedTransactionProjection = new PlannedTransactionProjection();
  plannedTransactionProjection.Project();
  return plannedTransactionProjection;
};

export const newProposedTransaction = () => {
  const proposedTransaction = new ProposedTransactionProjection();
  proposedTransaction.PlannedTransactionId = newPlannedTransaction().Id;
  proposedTransaction.Project();
  return proposedTransaction;
};

export const NewLedgerRequestedEvent = () => {
  const ledgerRequestedEvent = new LedgerRequestedEvent();
  ledgerRequestedEvent.AccountId = newAccountProjection().Id;
  ledgerRequestedEvent.Type = "TestType";
  return ledgerRequestedEvent;
};

export const NewExpenseRequestedEvent = () => {
  const expenseRequestedEvent = new ExpenseRequestedEvent();
  expenseRequestedEvent.CategoryId = newCategoryProjection().Id;
  expenseRequestedEvent.LedgerId = newLedgerProjection().Id;
  expenseRequestedEvent.PayeeId = newPayeeProjection().Id;
  expenseRequestedEvent.PlannedExpenseId = newPlannedExpenseProjection().Id;
  expenseRequestedEvent.TransactionId = newTransactionProjection().Id;
  return expenseRequestedEvent;
};

export const NewAccountRequestedEvent = () => {
  const accountRequestedEvent = new AccountRequestedEvent();
  accountRequestedEvent.UserId = newUserProjection().Id;
  return accountRequestedEvent;
};

export const NewTransactionRequestedEvent = () => {
  const transactionRequestedEvent = new TransactionRequestedEvent();
  transactionRequestedEvent.LedgerId = newLedgerProjection().Id;
  return transactionRequestedEvent;
};


export const NewProposedTransactionCreationRequestedEvent = () => {
  const event = new ProposedTransactionRequestedEvent();
  event.PlannedTransactionId = newPlannedTransaction().Id;
  return event;
};

export const NewPlannedTransactionCreationRequestedEvent = () => {
  const event = new PlannedTransactionRequestedEvent();
  return event;
};

export const NewDepositCreatedEvent = () => {
  const depositProjection = newDepositProjection();
  const depositCreatedEvent = new DepositCreatedEvent();
  depositCreatedEvent.DepositId = depositProjection.Id;
  return depositCreatedEvent;
};

export const NewTransactionCreatedEvent = () => {
  const transactionProjection = newTransactionProjection();
  const transactionCreatedEvent = new TransactionCreatedEvent();
  transactionCreatedEvent.TransactionId = transactionProjection.Id;
  return transactionCreatedEvent;
};

export const NewLedgerCreatedEvent = () => {
  const ledgerProjection = newLedgerProjection();
  const ledgerCreatedEvent = new LedgerCreatedEvent();
  ledgerCreatedEvent.LedgerId = ledgerProjection.Id;
  return ledgerCreatedEvent;
};

export const NewAccountCreatedEvent = () => {
  const accountProjection = newAccountProjection();
  const accountCreatedEvent = new AccountCreatedEvent();
  accountCreatedEvent.AccountId = accountProjection.Id;
  return accountCreatedEvent;
};

export const NewExpenseCreatedEvent = () => {
  const expenseProjection = newExpenseProjection();
  const expenseCreatedEvent = new ExpenseCreatedEvent();
  expenseCreatedEvent.ExpenseId = expenseProjection.Id;
  return expenseCreatedEvent;
};

export const PublishUserRequestedEvent = () => {
  const userRequestedEvent = new UserRequestedEvent();
  userRequestedEvent.UserName = "Test";
  userRequestedEvent.Type = "Test";
  userRequestedEvent.Publish();
};

export const PublishAllocationRequestedEvent = (transactionId, ledgerId) => {
  const allocationRequestedEvent = new AllocationRequestedEvent();
  allocationRequestedEvent.LedgerId = ledgerId;
  allocationRequestedEvent.TransactionId = transactionId;
  allocationRequestedEvent.Publish();
};

export const PublishAccountRequestedEvent = (userId) => {
  const accountRequestedEvent = new AccountRequestedEvent();
  accountRequestedEvent.AccountName = "Wells Fargo Checking";
  accountRequestedEvent.Type = "Bank";
  accountRequestedEvent.UserId = userId;
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

export function GetLast<TProjection extends Projection>(type: any) {
  const projections = ProjectionStore.Instance.GetProjections<TProjection>(type);
  const last = projections[projections.length - 1];
  return last;
}

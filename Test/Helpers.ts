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

const newTransactionProjection = async (): Promise<TransactionProjection> => {
  const transaction = new TransactionProjection();
  transaction.LedgerId = (await newLedgerProjection()).Id;
  transaction.Amount = -1;
  await transaction.Project();
  return new Promise((resolve, reject) => resolve(transaction));
};

const newPlannedExpenseProjection = async (): Promise<PlannedExpenseProjection> => {
  const plannedExpense = new PlannedExpenseProjection();
  await plannedExpense.Project();
  return new Promise((resolve, reject) => resolve(plannedExpense));
};

const newPlannedDepositProjection = async (): Promise<PlannedDepositProjection> => {
  const plannedDeposit = new PlannedDepositProjection();
  await plannedDeposit.Project();
  return new Promise((resolve, reject) => resolve(plannedDeposit));
};

const newPayeeProjection = async (): Promise<PayeeProjection> => {
  const payeeProjection = new PayeeProjection();
  payeeProjection.PayeeName = "TestPayeeName";
  await payeeProjection.Project();
  return new Promise((resolve, reject) => resolve(payeeProjection));
};

const newPayerProjection = async (): Promise<PayerProjection> => {
  const payerProjection = new PayerProjection();
  payerProjection.PayerName = "TestPayerName";
  await payerProjection.Project();
  return new Promise((resolve, reject) => resolve(payerProjection));
};

const newExpenseProjection = async (): Promise<ExpenseProjection> => {
  const expenseProjection = new ExpenseProjection();
  expenseProjection.PlannedExpenseId = (await newPlannedExpenseProjection()).Id;
  expenseProjection.LedgerId = (await newLedgerProjection()).Id;
  expenseProjection.PayeeId = (await newPayeeProjection()).Id;
  await expenseProjection.Project();
  return new Promise((resolve, reject) => resolve(expenseProjection));
};

const newDepositProjection = async (): Promise<DepositProjection> => {
  const depositProjection = new DepositProjection();
  depositProjection.PlannedDepositId = (await newPlannedDepositProjection()).Id;
  depositProjection.LedgerId = (await newLedgerProjection()).Id;
  depositProjection.PayerId = (await newPayerProjection()).Id;
  await depositProjection.Project();
  return new Promise((resolve, reject) => resolve(depositProjection));
};

const newLedgerProjection = async (): Promise<LedgerProjection> => {
  const ledgerProjection = new LedgerProjection();
  ledgerProjection.AccountId = (await newAccountProjection()).Id;
  await ledgerProjection.Project();
  return new Promise((resolve, reject) => resolve(ledgerProjection));
};

const newAccountProjection = async (): Promise<AccountProjection> => {
  const accountProjection = new AccountProjection();
  accountProjection.AccountName = "TestAccountName";
  accountProjection.Type = "TestType";
  accountProjection.UserId = (await newUserProjection()).Id;
  await accountProjection.Project();
  return new Promise((resolve, reject) => resolve(accountProjection));
};

const newUserProjection = async (): Promise<UserProjection> => {
  const userProjection = new UserProjection();
  await userProjection.Project();
  return new Promise((resolve, reject) => resolve(userProjection));
};

const newCategoryProjection = async (): Promise<CategoryProjection> => {
  const categoryProjection = new CategoryProjection();
  await categoryProjection.Project();
  return new Promise((resolve, reject) => resolve(categoryProjection));
};

export const newPlannedTransaction = async (): Promise<PlannedTransactionProjection> => {
  const plannedTransactionProjection = new PlannedTransactionProjection();
  await plannedTransactionProjection.Project();
  return new Promise((resolve, reject) => resolve(plannedTransactionProjection));
};

export const newProposedTransaction = async (): Promise<ProposedTransactionProjection> => {
  const proposedTransaction = new ProposedTransactionProjection();
  proposedTransaction.PlannedTransactionId = (await newPlannedTransaction()).Id;
  await proposedTransaction.Project();
  return new Promise((resolve, reject) => resolve(proposedTransaction));
};

export const NewLedgerRequestedEvent = async (): Promise<LedgerRequestedEvent> => {
  const ledgerRequestedEvent = new LedgerRequestedEvent();
  ledgerRequestedEvent.AccountId = (await newAccountProjection()).Id;
  ledgerRequestedEvent.Type = "TestType";
  return new Promise((resolve, reject) => resolve(ledgerRequestedEvent));
};

export const NewExpenseRequestedEvent = async (): Promise<ExpenseRequestedEvent> => {
  const expenseRequestedEvent = new ExpenseRequestedEvent();
  expenseRequestedEvent.CategoryId = (await newCategoryProjection()).Id;
  expenseRequestedEvent.LedgerId = (await newLedgerProjection()).Id;
  expenseRequestedEvent.PayeeId = (await newPayeeProjection()).Id;
  expenseRequestedEvent.PlannedExpenseId = (await newPlannedExpenseProjection()).Id;
  expenseRequestedEvent.TransactionId = (await newTransactionProjection()).Id;
  return new Promise((resolve, reject) => resolve(expenseRequestedEvent));
};

export const NewAccountRequestedEvent = async (): Promise<AccountRequestedEvent> => {
  const accountRequestedEvent = new AccountRequestedEvent();
  accountRequestedEvent.UserId = (await newUserProjection()).Id;
  return new Promise((resolve, reject) => resolve(accountRequestedEvent));
};

export const NewTransactionRequestedEvent = async (): Promise<TransactionRequestedEvent> => {
  const transactionRequestedEvent = new TransactionRequestedEvent();
  transactionRequestedEvent.LedgerId = (await newLedgerProjection()).Id;
  return new Promise((resolve, reject) => resolve(transactionRequestedEvent));
};

export const NewProposedTransactionCreationRequestedEvent = async (): Promise<ProposedTransactionRequestedEvent> => {
  const proposedTransactionRequestedEvent = new ProposedTransactionRequestedEvent();
  proposedTransactionRequestedEvent.PlannedTransactionId = (await newPlannedTransaction()).Id;
  return new Promise((resolve, reject) => resolve(proposedTransactionRequestedEvent));
};

export const NewPlannedTransactionCreationRequestedEvent = async (): Promise<PlannedTransactionRequestedEvent> => {
  const plannedTransactionRequestedEvent = new PlannedTransactionRequestedEvent();
  return new Promise((resolve, reject) => resolve(plannedTransactionRequestedEvent));
};

export const NewDepositCreatedEvent = async (): Promise<DepositCreatedEvent> => {
  const depositProjection = await newDepositProjection();
  const depositCreatedEvent = new DepositCreatedEvent();
  depositCreatedEvent.DepositId = depositProjection.Id;
  return new Promise((resolve, reject) => resolve(depositCreatedEvent));
};

export const NewTransactionCreatedEvent = async (): Promise<TransactionCreatedEvent> => {
  const transactionProjection = await newTransactionProjection();
  const transactionCreatedEvent = new TransactionCreatedEvent();
  transactionCreatedEvent.TransactionId = transactionProjection.Id;
  return new Promise((resolve, reject) => resolve(transactionCreatedEvent));
};

export const NewLedgerCreatedEvent = async (): Promise<LedgerCreatedEvent> => {
  const ledgerProjection = await newLedgerProjection();
  const ledgerCreatedEvent = new LedgerCreatedEvent();
  ledgerCreatedEvent.LedgerId = ledgerProjection.Id;
  return new Promise((resolve, reject) => resolve(ledgerCreatedEvent));
};

export const NewAccountCreatedEvent = async (): Promise<AccountCreatedEvent> => {
  const accountProjection = await newAccountProjection();
  const accountCreatedEvent = new AccountCreatedEvent();
  accountCreatedEvent.AccountId = accountProjection.Id;
  return new Promise((resolve, reject) => resolve(accountCreatedEvent));
};

export const NewExpenseCreatedEvent = async (): Promise<ExpenseCreatedEvent> => {
  const expenseProjection = await newExpenseProjection();
  const expenseCreatedEvent = new ExpenseCreatedEvent();
  expenseCreatedEvent.ExpenseId = expenseProjection.Id;
  return new Promise((resolve, reject) => resolve(expenseCreatedEvent));
};

export const PublishUserRequestedEvent = async (): Promise<UserRequestedEvent> => {
  const userRequestedEvent = new UserRequestedEvent();
  userRequestedEvent.UserName = "Test";
  userRequestedEvent.Type = "Test";
  await userRequestedEvent.Publish();
  return new Promise((resolve, reject) => resolve());
};

export const PublishAllocationRequestedEvent = async (transactionId, ledgerId): Promise<AllocationRequestedEvent> => {
  const allocationRequestedEvent = new AllocationRequestedEvent();
  allocationRequestedEvent.LedgerId = ledgerId;
  allocationRequestedEvent.TransactionId = transactionId;
  await allocationRequestedEvent.Publish();
  return new Promise((resolve, reject) => resolve());
};

export const PublishAccountRequestedEvent = async (userId): Promise<void> => {
  const accountRequestedEvent = new AccountRequestedEvent();
  accountRequestedEvent.AccountName = "Wells Fargo Checking";
  accountRequestedEvent.Type = "Bank";
  accountRequestedEvent.UserId = userId;
  await accountRequestedEvent.Publish();
  return new Promise((resolve, reject) => resolve());
};

export const PublishExpenseRequestedEvent = async (transactionId, ledgerId, plannedExpenseId = null, payeeId = null): Promise<void> => {
  const expenseRequestedEvent = new ExpenseRequestedEvent();
  expenseRequestedEvent.CategoryId = "CategoryId";
  expenseRequestedEvent.Description = "Description";
  expenseRequestedEvent.LedgerId = ledgerId;
  expenseRequestedEvent.PayeeId = payeeId;
  expenseRequestedEvent.PlannedExpenseId = plannedExpenseId;
  expenseRequestedEvent.TransactionId = transactionId;
  await expenseRequestedEvent.Publish();
  return new Promise((resolve, reject) => resolve());
};

export const PublishTransactionRequestedEvent = async (amount, ledgerId): Promise<void> => {
  const transactionRequestedEvent = new TransactionRequestedEvent();
  transactionRequestedEvent.Amount = amount;
  transactionRequestedEvent.LedgerId = ledgerId;
  await transactionRequestedEvent.Publish();
  return new Promise((resolve, reject) => resolve());
};

export const PublishPayeeRequestedEvent = async (): Promise<void> => {
  const payeeRequestedEvent = new PayeeRequestedEvent();
  payeeRequestedEvent.Description = "Test";
  payeeRequestedEvent.Type = "Test";
  await payeeRequestedEvent.Publish();
  return new Promise((resolve, reject) => resolve());
};

export const RequestPlannedExpenseEvent = async (): Promise<void> => {
  const event = new PlannedExpenseRequestedEvent();
  event.RepeatPeriod = 1;
  event.RepeatMeasurement = "Weeks";
  event.RepeatCount = -1;
  event.Description = "Testing";
  await event.Publish();
  return new Promise((resolve, reject) => resolve());
};

export async function GetLast<TProjection extends Projection>(type: any): Promise<TProjection> {
  const projections = await ProjectionStore.Instance.GetProjections<TProjection>(type);
  const last = projections[projections.length - 1];
  return new Promise((resolve, reject) => resolve(last));
}

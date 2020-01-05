import { assert } from "chai";
import "mocha";
import { TransactionRequestedEvent } from "../../Source/Events/Requested/Creation/TransactionRequestedEvent";
import { LedgerStartingBalanceUpdateRequestedEvent } from "../../Source/Events/Requested/Mutation/LedgerStartingBalanceUpdateRequestedEvent";
import { AccountProjection } from "../../Source/Projections/AccountProjection";
import { AllocationProjection } from "../../Source/Projections/AllocationProjection";
import { ProjectionStore } from "../../Source/Projections/Core/ProjectionStore";
import { ExpenseProjection } from "../../Source/Projections/ExpenseProjection";
import { LedgerProjection } from "../../Source/Projections/LedgerProjection";
import { PayeeProjection } from "../../Source/Projections/PayeeProjection";
import { PlannedExpenseProjection } from "../../Source/Projections/PlannedExpenseProjection";
import { TransactionProjection } from "../../Source/Projections/TransactionProjection";
import { UserProjection } from "../../Source/Projections/UserProjection";
import { System } from "../../Source/System/System";
import {
  GetLast,
  PublishAccountRequestedEvent,
  PublishAllocationRequestedEvent,
  PublishExpenseRequestedEvent,
  PublishPayeeRequestedEvent,
  PublishTransactionRequestedEvent,
  PublishUserRequestedEvent,
  RequestPlannedExpenseEvent
} from "../Helpers";

const projectionStore = ProjectionStore.Instance;

describe("Basic Usage", () => {
  let userId: any;
  let accountId: any;
  let ledgerId: any;

  before(() => {
    System.Shutdown();
  });

  after(() => {
    System.Shutdown();
  });
  it("Given the system is started", () => {
    System.Startup();
  });
  it("When a NewUserRequestedEvent is published", () => {
    PublishUserRequestedEvent();
  });
  it("Then a User should be created", () => {
    const user = projectionStore.GetProjections(UserProjection)[0];
    assert.exists(user);
    userId = user.Id;
  });
  it("And there should be a new default Account created", () => {
    const account = projectionStore.GetProjections(AccountProjection)[0];
    assert.exists(account);
  });
  it("And there should be a new Ledger created for the new default Account", () => {
    const ledgers = projectionStore.GetProjections(LedgerProjection);
    assert.equal(ledgers.length, 1);
    const ledger = ledgers[0];
    assert.exists(ledger);
  });
  it("When a new Account is requested", () => {
    PublishAccountRequestedEvent(userId);
  });
  it("Then an Account should be created", () => {
    const accounts = projectionStore.GetProjections(AccountProjection);
    assert.equal(accounts.length, 2);
    const account = accounts[1];
    assert.exists(account);
    accountId = account.Id;
  });
  it("And a Ledger should be created", () => {
    const ledgers = projectionStore.GetProjections(LedgerProjection);
    assert.equal(ledgers.length, 2);
    const ledger = ledgers[1];
    assert.exists(ledger);
    ledgerId = ledger.Id;
  });
  it("And the Ledger should be linked to the Account", () => {
    const ledger = LedgerProjection.Get(ledgerId);
    const account = AccountProjection.Get(ledger.AccountId);
    assert.equal(account.LedgerId, ledgerId);
  });
  it("And the ledger should have a zero balance", () => {
    const ledger = LedgerProjection.Get(ledgerId);
    assert.equal(ledger.Balance, 0);
  });
  it("When the ledger's starting balance is changed from 0 to 100", () => {
    const ledgerStartingBalanceUpdateRequested = new LedgerStartingBalanceUpdateRequestedEvent();
    ledgerStartingBalanceUpdateRequested.LedgerId = ledgerId;
    ledgerStartingBalanceUpdateRequested.StartingBalance = 100;
    ledgerStartingBalanceUpdateRequested.Publish();
  });
  it("The the Ledger's balance should be 100", () => {
    const ledger = LedgerProjection.Get(ledgerId);
    assert.equal(ledger.Balance, 100);
  });
  it("When a new $10 Allocation is made to the Ledger", () => {
    const ledger = LedgerProjection.Get(ledgerId);
    PublishTransactionRequestedEvent(-10, ledger.Id);
    const transaction = GetLast(TransactionProjection);
    PublishAllocationRequestedEvent(transaction.Id, ledger.Id);
  });
  it("Then the Ledger balance should be 110", () => {
    const ledger = LedgerProjection.Get(ledgerId);
    assert.equal(ledger.Balance, 110);
  });
  it("And a new Transaction should exist.", () => {
    const transactionProjection = projectionStore.GetProjections(TransactionProjection)[0];
    assert.exists(transactionProjection);
  });
  it("And the Ledger should be linked to 1 Transaction", () => {
    const ledger = LedgerProjection.Get(ledgerId);
    assert.equal(ledger.TransactionIds.length, 1);
  });
  it("And the Allocation should have been created", () => {
    const allocationProjection = GetLast(AllocationProjection);
    assert.exists(allocationProjection);
  });
  it("And the Allocation should be linked to the Ledger", () => {
    const allocationProjections = projectionStore.GetProjections<AllocationProjection>(AllocationProjection);
    assert.equal(allocationProjections[0].LedgerId, ledgerId);
  });
  it("When a new Planned Expense is requested", () => {
    RequestPlannedExpenseEvent();
  });
  it("Then a new PlannedExpenseProjection should exist", () => {
    const plannedExpense = projectionStore.GetProjections(PlannedExpenseProjection)[0];
    assert.exists(plannedExpense);
  });
  it("When a PayeeRequested event is Published", () => {
    PublishPayeeRequestedEvent();
  });
  it("Then a new PayeeProjection should exist", () => {
    const payeeProjection = projectionStore.GetProjections(PayeeProjection)[0];
    assert.exists(payeeProjection);
  });
  it("When an ExpenseRequested (With a PlannedProjectionId & PayeeId) event is Published for 10", () => {
    const transaction = new TransactionRequestedEvent();
    transaction.Amount = 10;
    transaction.LedgerId = ledgerId;
    transaction.Publish();
    const payeeProjection = projectionStore.GetProjections(PayeeProjection)[0];
    const plannedExpense = projectionStore.GetProjections(PlannedExpenseProjection)[0];
    PublishExpenseRequestedEvent(transaction.Id, ledgerId, plannedExpense.Id, payeeProjection.Id);
  });
  it("Then a new ExpenseProjection should exist", () => {
    const expenseProjection = projectionStore.GetProjections(ExpenseProjection)[0];
    assert.exists(expenseProjection);
  });
  it("And a new Transaction should exist", () => {
    const transaction = GetLast(TransactionProjection);
    assert.exists(transaction);
  });
  it("And the new Transaction should have an Amount of 10", () => {
    const transaction = GetLast<TransactionProjection>(TransactionProjection);
    assert.equal(transaction.Amount, 10);
  });
  it("And the Ledger Balance should be 100", () => {
    const ledger = LedgerProjection.Get(ledgerId);
    assert.equal(ledger.Balance, 100);
  });
  it("And the PlannedExpenseProjection contains the ExpenseProjection Id", () => {
    const plannedExpenseProjection = GetLast<PlannedExpenseProjection>(PlannedExpenseProjection);
    const expenseProjection = GetLast(ExpenseProjection);
    const foundId = plannedExpenseProjection.ExpenseIds.find(x => x === expenseProjection.Id);
    assert.exists(foundId);
  });
  it("And the Payee involved contains the ExpenseProjection Id", () => {
    const expenseProjection = GetLast(ExpenseProjection);
    const payeeProjection = GetLast<PayeeProjection>(PayeeProjection);
    const foundId = payeeProjection.ExpenseIds.find(x => x === expenseProjection.Id);
    assert.exists(foundId);
  });
  it("When the ledger's starting balance is changed from 100 to 200", () => {
    const ledgerStartingBalanceUpdateRequested = new LedgerStartingBalanceUpdateRequestedEvent();
    ledgerStartingBalanceUpdateRequested.LedgerId = ledgerId;
    ledgerStartingBalanceUpdateRequested.StartingBalance = 200;
    ledgerStartingBalanceUpdateRequested.Publish();
  });
  it("The the Ledger's balance should be 200", () => {
    const ledger = LedgerProjection.Get(ledgerId);
    assert.equal(ledger.Balance, 200);
  });
  it("When the ledger's starting balance is changed from 200 to 1", () => {
    const ledgerStartingBalanceUpdateRequested = new LedgerStartingBalanceUpdateRequestedEvent();
    ledgerStartingBalanceUpdateRequested.LedgerId = ledgerId;
    ledgerStartingBalanceUpdateRequested.StartingBalance = 1;
    ledgerStartingBalanceUpdateRequested.Publish();
  });
  it("The the Ledger's balance should be 1", () => {
    const ledger = LedgerProjection.Get(ledgerId);
    assert.equal(ledger.Balance, 1);
  });
});

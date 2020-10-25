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

  before(async () => {
    await System.Shutdown();
  });

  after(async () => {
    await System.Shutdown();
  });
  it("Given the system is started", async () => {
    await System.Startup();
  });
  it("When a NewUserRequestedEvent is published", async () => {
    await PublishUserRequestedEvent();
  });
  it("Then a User should be created", async () => {
    const user = (await projectionStore.GetProjections(UserProjection))[0];
    assert.exists(user);
    userId = user.Id;
  });
  it("And there should be a new default Account created", async () => {
    const account = (await projectionStore.GetProjections(AccountProjection))[0];
    assert.exists(account);
  });
  it("And there should be a new Ledger created for the new default Account", async () => {
    const ledgers = await projectionStore.GetProjections(LedgerProjection);
    assert.equal(ledgers.length, 1);
    const ledger = ledgers[0];
    assert.exists(ledger);
  });
  it("When a new Account is requested", async () => {
    await PublishAccountRequestedEvent(userId);
  });
  it("Then an Account should be created", async () => {
    const accounts = await projectionStore.GetProjections(AccountProjection);
    assert.equal(accounts.length, 2);
    const account = accounts[1];
    assert.exists(account);
    accountId = account.Id;
  });
  it("And a Ledger should be created", async () => {
    const ledgers = await projectionStore.GetProjections(LedgerProjection);
    assert.equal(ledgers.length, 2);
    const ledger = ledgers[1];
    assert.exists(ledger);
    ledgerId = ledger.Id;
  });
  it("And the Ledger should be linked to the Account", async () => {
    const ledger = await LedgerProjection.Get(ledgerId);
    const account = await AccountProjection.Get(ledger.AccountId);
    assert.equal(account.LedgerId, ledgerId);
  });
  it("And the ledger should have a zero balance", async () => {
    const ledger = await LedgerProjection.Get(ledgerId);
    assert.equal(ledger.Balance, 0);
  });
  it("When the ledger's starting balance is changed from 0 to 100", async () => {
    const ledgerStartingBalanceUpdateRequested = new LedgerStartingBalanceUpdateRequestedEvent();
    ledgerStartingBalanceUpdateRequested.LedgerId = ledgerId;
    ledgerStartingBalanceUpdateRequested.StartingBalance = 100;
    await ledgerStartingBalanceUpdateRequested.Publish();
  });
  it("The the Ledger's balance should be 100", async () => {
    const ledger = await LedgerProjection.Get(ledgerId);
    assert.equal(ledger.Balance, 100);
  });
  it("When a new $10 Allocation is made to the Ledger", async () => {
    const ledger = await LedgerProjection.Get(ledgerId);
    await PublishTransactionRequestedEvent(-10, ledger.Id);
    const transaction = await GetLast(TransactionProjection);
    await PublishAllocationRequestedEvent(transaction.Id, ledger.Id);
  });
  it("Then the Ledger balance should be 110", async () => {
    const ledger = await LedgerProjection.Get(ledgerId);
    assert.equal(ledger.Balance, 110);
  });
  it("And a new Transaction should exist.", async () => {
    const transactionProjection = (await projectionStore.GetProjections(TransactionProjection))[0];
    assert.exists(transactionProjection);
  });
  it("And the Ledger should be linked to 1 Transaction", async () => {
    const ledger = await LedgerProjection.Get(ledgerId);
    assert.equal(ledger.TransactionIds.length, 1);
  });
  it("And the Allocation should have been created", async () => {
    const allocationProjection = GetLast(AllocationProjection);
    assert.exists(allocationProjection);
  });
  it("And the Allocation should be linked to the Ledger", async () => {
    const allocationProjections = await projectionStore.GetProjections<AllocationProjection>(AllocationProjection);
    assert.equal(allocationProjections[0].LedgerId, ledgerId);
  });
  it("When a new Planned Expense is requested", async () => {
    await RequestPlannedExpenseEvent();
  });
  it("Then a new PlannedExpenseProjection should exist", async () => {
    const plannedExpense = (await projectionStore.GetProjections(PlannedExpenseProjection))[0];
    assert.exists(plannedExpense);
  });
  it("When a PayeeRequested event is Published", async () => {
    await PublishPayeeRequestedEvent();
  });
  it("Then a new PayeeProjection should exist", async () => {
    const payeeProjection = (await projectionStore.GetProjections(PayeeProjection))[0];
    assert.exists(payeeProjection);
  });
  it("When an ExpenseRequested (With a PlannedProjectionId & PayeeId) event is Published for 10", async () => {
    const transaction = new TransactionRequestedEvent();
    transaction.Amount = 10;
    transaction.LedgerId = ledgerId;
    await transaction.Publish();
    const payeeProjection = (await projectionStore.GetProjections(PayeeProjection))[0];
    const plannedExpense = (await projectionStore.GetProjections(PlannedExpenseProjection))[0];
    await PublishExpenseRequestedEvent(transaction.Id, ledgerId, plannedExpense.Id, payeeProjection.Id);
  });
  it("Then a new ExpenseProjection should exist", async () => {
    const expenseProjection = (await projectionStore.GetProjections(ExpenseProjection))[0];
    assert.exists(expenseProjection);
  });
  it("And a new Transaction should exist", async () => {
    const transaction = await GetLast(TransactionProjection);
    assert.exists(transaction);
  });
  it("And the new Transaction should have an Amount of 10", async () => {
    const transaction = await GetLast<TransactionProjection>(TransactionProjection);
    assert.equal(transaction.Amount, 10);
  });
  it("And the Ledger Balance should be 100", async () => {
    const ledger = await LedgerProjection.Get(ledgerId);
    assert.equal(ledger.Balance, 100);
  });
  it("And the PlannedExpenseProjection contains the ExpenseProjection Id", async () => {
    const plannedExpenseProjection = await GetLast<PlannedExpenseProjection>(PlannedExpenseProjection);
    const expenseProjection = await GetLast(ExpenseProjection);
    const foundId = plannedExpenseProjection.ExpenseIds.find(x => x === expenseProjection.Id);
    assert.exists(foundId);
  });
  it("And the Payee involved contains the ExpenseProjection Id", async () => {
    const expenseProjection = await GetLast(ExpenseProjection);
    const payeeProjection = await GetLast<PayeeProjection>(PayeeProjection);
    const foundId = payeeProjection.ExpenseIds.find(x => x === expenseProjection.Id);
    assert.exists(foundId);
  });
  it("When the ledger's starting balance is changed from 100 to 200", async () => {
    const ledgerStartingBalanceUpdateRequested = new LedgerStartingBalanceUpdateRequestedEvent();
    ledgerStartingBalanceUpdateRequested.LedgerId = ledgerId;
    ledgerStartingBalanceUpdateRequested.StartingBalance = 200;
    await ledgerStartingBalanceUpdateRequested.Publish();
  });
  it("The the Ledger's balance should be 200", async () => {
    const ledger = await LedgerProjection.Get(ledgerId);
    assert.equal(ledger.Balance, 200);
  });
  it("When the ledger's starting balance is changed from 200 to 1", async () => {
    const ledgerStartingBalanceUpdateRequested = new LedgerStartingBalanceUpdateRequestedEvent();
    ledgerStartingBalanceUpdateRequested.LedgerId = ledgerId;
    ledgerStartingBalanceUpdateRequested.StartingBalance = 1;
    await ledgerStartingBalanceUpdateRequested.Publish();
  });
  it("The the Ledger's balance should be 1", async () => {
    const ledger = await LedgerProjection.Get(ledgerId);
    assert.equal(ledger.Balance, 1);
  });
});

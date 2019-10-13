import { CreateAccountService } from "../Creates/CreateAccountService";
import { CreateAllocationService } from "../Creates/CreateAllocationService";
import { CreateBudgetService } from "../Creates/CreateBudgetService";
import { CreateCategoryService } from "../Creates/CreateCategoryService";
import { CreateExpenseService } from "../Creates/CreateExpenseService";
import { CreateForecastService } from "../Creates/CreateForecastProjection";
import { CreateLedgerService } from "../Creates/CreateLedgerService";
import { CreatePayeeService } from "../Creates/CreatePayeeService";
import { CreatePlannedDepositService } from "../Creates/CreatePlannedDepositService";
import { CreatePlannedExpenseService } from "../Creates/CreatePlannedExpenseService";
import { CreateTransactionService } from "../Creates/CreateTransactionService";
import { CreateUserService } from "../Creates/CreateUserService";
import { ForecastPlannedTransactionsService } from "../ForecastPlannedTransactions";
import { LinkAccountToUserService } from "../Links/LinkAccountToUserService";
import { LinkDepositToPlannedDepositService } from "../Links/LinkDepositToPlannedDepositService";
import { LinkExpenseToPayeeService } from "../Links/LinkExpenseToPayeeService";
import { LinkExpenseToPlannedExpenseService } from "../Links/LinkExpenseToPlannedExpenseService";
import { LinkForecastToPlannedDepositsService } from "../Links/LinkForecastToPlannedDepositsService";
import { LinkForecastToPlannedExpensesService } from "../Links/LinkForecastToPlannedExpensesService";
import { LinkLedgerToAccountService } from "../Links/LinkLedgerToAccountService";
import { LinkTransactionToLedgerService } from "../Links/LinkTransactionToLedgerService";
import { PublishAccountRequestedService } from "../Publishers/PublishAccountRequestedService";
import { PublishLedgerRequestedService } from "../Publishers/PublishLedgerRequestedService";
import { UpdateLedgerBalanceService } from "../Updates/UpdateLedgerBalanceService";
import { UpdateLedgerStartingBalanceService } from "../Updates/UpdateLedgerStartingBalanceService";
import { ISubscribable } from "./ISubscribable";

export class Subscriptions {
  public static Create() {
    this.handlers.forEach((handler) => {
      handler.Subscribe();
    });
  }
  public static Release() {
    this.handlers.forEach((handler) => {
      handler.UnSubscribe();
    });
  }
  private static handlers: ISubscribable[] = [
    CreateAccountService.Instance,
    CreateAllocationService.Instance,
    CreateBudgetService.Instance,
    CreateCategoryService.Instance,
    CreateExpenseService.Instance,
    CreateForecastService.Instance,
    CreateLedgerService.Instance,
    CreatePayeeService.Instance,
    CreatePlannedDepositService.Instance,
    CreatePlannedExpenseService.Instance,
    CreateTransactionService.Instance,
    CreateUserService.Instance,
    LinkAccountToUserService.Instance,
    LinkDepositToPlannedDepositService.Instance,
    LinkExpenseToPayeeService.Instance,
    LinkExpenseToPlannedExpenseService.Instance,
    LinkForecastToPlannedDepositsService.Instance,
    LinkForecastToPlannedExpensesService.Instance,
    LinkLedgerToAccountService.Instance,
    LinkTransactionToLedgerService.Instance,
    PublishAccountRequestedService.Instance,
    PublishLedgerRequestedService.Instance,
    UpdateLedgerBalanceService.Instance,
    UpdateLedgerStartingBalanceService.Instance,
    ForecastPlannedTransactionsService.Instance,
  ];
}

import { CreateAccountService } from "../Services/Creates/CreateAccountService";
import { CreateAllocationService } from "../Services/Creates/CreateAllocationService";
import { CreateBudgetService } from "../Services/Creates/CreateBudgetService";
import { CreateCategoryService } from "../Services/Creates/CreateCategoryService";
import { CreateExpenseService } from "../Services/Creates/CreateExpenseService";
import { CreateForecastService } from "../Services/Creates/CreateForecastProjection";
import { CreateLedgerService } from "../Services/Creates/CreateLedgerService";
import { CreatePayeeService } from "../Services/Creates/CreatePayeeService";
import { CreatePlannedDepositService } from "../Services/Creates/CreatePlannedDepositService";
import { CreatePlannedExpenseService } from "../Services/Creates/CreatePlannedExpenseService";
import { CreateTransactionService } from "../Services/Creates/CreateTransactionService";
import { CreateUserService } from "../Services/Creates/CreateUserService";
import { ForecastPlannedTransactionsService } from "../Services/ForecastPlannedTransactions";
import { LinkAccountToUserService } from "../Services/Links/LinkAccountToUserService";
import { LinkDepositToPlannedDepositService } from "../Services/Links/LinkDepositToPlannedDepositService";
import { LinkExpenseToPayeeService } from "../Services/Links/LinkExpenseToPayeeService";
import { LinkExpenseToPlannedExpenseService } from "../Services/Links/LinkExpenseToPlannedExpenseService";
import { LinkForecastToPlannedDepositService } from "../Services/Links/LinkForecastToPlannedDepositService";
import { LinkForecastToPlannedDepositsService } from "../Services/Links/LinkForecastToPlannedDepositsService";
import { LinkForecastToPlannedExpenseService } from "../Services/Links/LinkForecastToPlannedExpenseService";
import { LinkForecastToPlannedExpensesService } from "../Services/Links/LinkForecastToPlannedExpensesService";
import { LinkLedgerToAccountService } from "../Services/Links/LinkLedgerToAccountService";
import { LinkTransactionToLedgerService } from "../Services/Links/LinkTransactionToLedgerService";
import { PublishAccountRequestedService } from "../Services/Publishers/PublishAccountRequestedService";
import { PublishLedgerRequestedService } from "../Services/Publishers/PublishLedgerRequestedService";
import { UpdateLedgerBalanceService } from "../Services/Updates/UpdateLedgerBalanceService";
import { UpdateLedgerStartingBalanceService } from "../Services/Updates/UpdateLedgerStartingBalanceService";
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
    LinkForecastToPlannedDepositService.Instance,
    LinkForecastToPlannedExpensesService.Instance,
    LinkForecastToPlannedExpenseService.Instance,
    LinkLedgerToAccountService.Instance,
    LinkTransactionToLedgerService.Instance,
    PublishAccountRequestedService.Instance,
    PublishLedgerRequestedService.Instance,
    UpdateLedgerBalanceService.Instance,
    UpdateLedgerStartingBalanceService.Instance,
    ForecastPlannedTransactionsService.Instance,
  ];
}

import { ISubscribable } from "./Services/Core/ISubscribable";
import { CreateAccountService } from "./Services/Creates/CreateAccountService";
import { CreateAllocationService } from "./Services/Creates/CreateAllocationService";
import { CreateBudgetService } from "./Services/Creates/CreateBudgetService";
import { CreateCategoryService } from "./Services/Creates/CreateCategoryService";
import { CreateExpenseService } from "./Services/Creates/CreateExpenseService";
import { CreateForecastService } from "./Services/Creates/CreateForecastProjection";
import { CreateLedgerService } from "./Services/Creates/CreateLedgerService";
import { CreatePayeeService } from "./Services/Creates/CreatePayeeService";
import { CreatePlannedDepositService } from "./Services/Creates/CreatePlannedDepositService";
import { CreatePlannedExpenseService } from "./Services/Creates/CreatePlannedExpenseService";
import { CreatePlannedTransactionService } from "./Services/Creates/CreatePlannedTransactionService";
import { CreateProposedTransactionService } from "./Services/Creates/CreateProposedTransactionService";
import { CreateTransactionService } from "./Services/Creates/CreateTransactionService";
import { CreateUserService } from "./Services/Creates/CreateUserService";
import { ForecastPlannedTransactionsService } from "./Services/Domain/ForecastPlannedTransactionsService";
import { LinkAccountToUserService } from "./Services/Links/LinkAccountToUserService";
import { LinkDepositToPlannedDepositService } from "./Services/Links/LinkDepositToPlannedDepositService";
import { LinkExpenseToPayeeService } from "./Services/Links/LinkExpenseToPayeeService";
import { LinkExpenseToPlannedExpenseService } from "./Services/Links/LinkExpenseToPlannedExpenseService";
import { LinkForecastToPlannedDepositsService } from "./Services/Links/LinkForecastToPlannedDepositsService";
import { LinkForecastToPlannedExpensesService } from "./Services/Links/LinkForecastToPlannedExpensesService";
import { LinkLedgerToAccountService } from "./Services/Links/LinkLedgerToAccountService";
import { LinkProposedTransactionToPlannedTransactionService } from "./Services/Links/LinkProposedTransactionToPlannedTransactionService";
import { LinkTransactionToLedgerService } from "./Services/Links/LinkTransactionToLedgerService";
import { ChainPlannedExpenseCreatedToPlannedTransactionRequestedService } from "./Services/Publishers/ChainPlannedExpenseCreatedToPlannedTransactionRequestedService";
import { PublishAccountRequestedService } from "./Services/Publishers/PublishAccountRequestedService";
import { PublishLedgerRequestedService } from "./Services/Publishers/PublishLedgerRequestedService";
import { RequestPlannedTransactionService } from "./Services/Publishers/RequestPlannedTransactionService";
import { RequestProposedTransactionService } from "./Services/Publishers/RequestProposedTransactionService";
import { UpdateLedgerBalanceService } from "./Services/Updates/UpdateLedgerBalanceService";
import { UpdateLedgerStartingBalanceService } from "./Services/Updates/UpdateLedgerStartingBalanceService";

export class Subscriptions {
  public static Create() {
    const subscriber = (handler) => {
      handler.Subscribe();
    };
    Subscriptions.allSubscriptions.forEach((subscriptionList) => {
      subscriptionList.forEach(subscriber);
    });
  }
  public static Release() {
    const unSubscriber = (handler) => {
      handler.UnSubscribe();
    };
    Subscriptions.allSubscriptions.forEach((subscriptionList) => {
      subscriptionList.forEach(unSubscriber);
    });
  }
  private static createServices: ISubscribable[] = [
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
    CreatePlannedTransactionService.Instance,
    CreateProposedTransactionService.Instance,
    CreateTransactionService.Instance,
    CreateUserService.Instance,
  ];
  private static updateServices: ISubscribable[] = [
    UpdateLedgerBalanceService.Instance,
    UpdateLedgerStartingBalanceService.Instance,
  ];
  private static linkServices: ISubscribable[] = [
    LinkAccountToUserService.Instance,
    LinkDepositToPlannedDepositService.Instance,
    LinkExpenseToPayeeService.Instance,
    LinkExpenseToPlannedExpenseService.Instance,
    LinkForecastToPlannedDepositsService.Instance,
    LinkForecastToPlannedExpensesService.Instance,
    LinkLedgerToAccountService.Instance,
    LinkTransactionToLedgerService.Instance,
    LinkProposedTransactionToPlannedTransactionService.Instance,
  ];
  private static eventChainServices = [
    PublishAccountRequestedService.Instance,
    PublishLedgerRequestedService.Instance,
    RequestProposedTransactionService.Instance,
    ChainPlannedExpenseCreatedToPlannedTransactionRequestedService.Instance,
    RequestPlannedTransactionService.Instance,
  ];
  private static domainServices = [
    ForecastPlannedTransactionsService.Instance,
  ];
  private static allSubscriptions: ISubscribable[][] = [
    Subscriptions.createServices,
    Subscriptions.updateServices,
    Subscriptions.linkServices,
    Subscriptions.eventChainServices,
    Subscriptions.domainServices,
  ];
}

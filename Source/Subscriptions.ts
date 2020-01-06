import { ISubscriber } from "./Services/Core/ISubscriber";
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
import { IncrementProposedTransactionCounter } from "./Services/Domain/IncrementProposedTransactionCounter";
import { ProposeTransactionsForToday } from "./Services/Domain/ProposeTransactionsForToday";
import { UpdateLedgerBalanceService } from "./Services/Domain/UpdateLedgerBalanceService";
import { UpdateLedgerStartingBalanceService } from "./Services/Domain/UpdateLedgerStartingBalanceService";
import { LinkAccountToUserService } from "./Services/Links/LinkAccountToUserService";
import { LinkDepositToPlannedDepositService } from "./Services/Links/LinkDepositToPlannedDepositService";
import { LinkExpenseToPayeeService } from "./Services/Links/LinkExpenseToPayeeService";
import { LinkExpenseToPlannedExpenseService } from "./Services/Links/LinkExpenseToPlannedExpenseService";
import { LinkForecastToPlannedDepositService } from "./Services/Links/LinkForecastToPlannedDepositService";
import { LinkForecastToPlannedExpenseService } from "./Services/Links/LinkForecastToPlannedExpenseService";
import { LinkLedgerToAccountService } from "./Services/Links/LinkLedgerToAccountService";
import { LinkProposedTransactionToPlannedTransactionService } from "./Services/Links/LinkProposedTransactionToPlannedTransactionService";
import { LinkTransactionToLedgerService } from "./Services/Links/LinkTransactionToLedgerService";
import { AccountCreatedToLedgerRequested } from "./Services/Routes/AccountCreatedToLedgerRequested";
import { PlannedDepositCreatedToPlannedTransactionRequested } from "./Services/Routes/PlannedDepositCreatedToPlannedTransactionRequested";
import { PlannedExpenseCreatedToPlannedTransactionRequested } from "./Services/Routes/PlannedExpenseCreatedToPlannedTransactionRequested";
import { PlannedTransactionCreatedToProposedTransactionRequested } from "./Services/Routes/PlannedTransactionCreatedToProposedTransactionRequested";
import { UserCreatedToAccountRequested } from "./Services/Routes/UserCreatedToAccountRequested";

export class Subscriptions {
  public static Create() {
    const subscriber = handler => {
      handler.Subscribe();
    };
    Subscriptions.allSubscriptions.forEach(subscriptionList => {
      subscriptionList.forEach(subscriber);
    });
  }
  public static Release() {
    const unSubscriber = handler => {
      handler.UnSubscribe();
    };
    Subscriptions.allSubscriptions.forEach(subscriptionList => {
      subscriptionList.forEach(unSubscriber);
    });
  }
  private static createServices: ISubscriber[] = [
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
    CreateUserService.Instance
  ];
  private static updateServices: ISubscriber[] = [UpdateLedgerBalanceService.Instance, UpdateLedgerStartingBalanceService.Instance, IncrementProposedTransactionCounter.Instance];
  private static linkServices: ISubscriber[] = [
    LinkAccountToUserService.Instance,
    LinkDepositToPlannedDepositService.Instance,
    LinkExpenseToPayeeService.Instance,
    LinkExpenseToPlannedExpenseService.Instance,
    LinkForecastToPlannedDepositService.Instance,
    LinkForecastToPlannedExpenseService.Instance,
    LinkLedgerToAccountService.Instance,
    LinkTransactionToLedgerService.Instance,
    LinkProposedTransactionToPlannedTransactionService.Instance
  ];
  private static eventChainServices = [
    AccountCreatedToLedgerRequested.Instance,
    PlannedDepositCreatedToPlannedTransactionRequested.Instance,
    PlannedExpenseCreatedToPlannedTransactionRequested.Instance,
    PlannedTransactionCreatedToProposedTransactionRequested.Instance,
    UserCreatedToAccountRequested.Instance
  ];
  private static domainServices = [ForecastPlannedTransactionsService.Instance, ProposeTransactionsForToday.Instance];
  private static allSubscriptions: ISubscriber[][] = [Subscriptions.createServices, Subscriptions.updateServices, Subscriptions.linkServices, Subscriptions.eventChainServices, Subscriptions.domainServices];
}

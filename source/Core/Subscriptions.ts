import { CreateAccountService } from "../Services/Creates/CreateAccountService";
import { CreateAllocationService } from "../Services/Creates/CreateAllocationService";
import { CreateBudgetService } from "../Services/Creates/CreateBudgetService";
import { CreateCategoryService } from "../Services/Creates/CreateCategoryService";
import { CreateExpenseService } from "../Services/Creates/CreateExpenseService";
import { CreateLedgerService } from "../Services/Creates/CreateLedgerService";
import { CreatePayeeService } from "../Services/Creates/CreatePayeeService";
import { CreatePlannedExpenseService } from "../Services/Creates/CreatePlannedExpenseService";
import { CreateTransactionService } from "../Services/Creates/CreateTransactionService";
import { CreateUserService } from "../Services/Creates/CreateUserService";
import { LinkAccountToUserService } from "../Services/Links/LinkAccountToUserService";
import { LinkExpenseToPayeeService } from "../Services/Links/LinkExpenseToPayeeService";
import { LinkExpenseToPlannedExpenseService } from "../Services/Links/LinkExpenseToPlannedExpenseService";
import { LinkLedgerToAccountService } from "../Services/Links/LinkLedgerToAccountService";
import { LinkTransactionToLedgerService } from "../Services/Links/LinkTransactionToLedgerService";
import { RequestAccountService } from "../Services/Requests/RequestAccountService";
import { RequestLedgerService } from "../Services/Requests/RequestLedgerService";
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
    CreateLedgerService.Instance,
    CreatePayeeService.Instance,
    CreatePlannedExpenseService.Instance,
    CreateTransactionService.Instance,
    CreateUserService.Instance,
    LinkAccountToUserService.Instance,
    LinkExpenseToPayeeService.Instance,
    LinkExpenseToPlannedExpenseService.Instance,
    LinkLedgerToAccountService.Instance,
    LinkTransactionToLedgerService.Instance,
    RequestAccountService.Instance,
    RequestLedgerService.Instance,
    UpdateLedgerBalanceService.Instance,
    UpdateLedgerStartingBalanceService.Instance,
  ];
}

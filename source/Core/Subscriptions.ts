import { CreateAccountService } from "../Services/Creates/CreateAccountService";
import { CreateAllocationService } from "../Services/Creates/CreateAllocationService";
import { CreateExpenseService } from "../Services/Creates/CreateExpenseService";
import { CreateLedgerService } from "../Services/Creates/CreateLedgerService";
import { CreatePayeeService } from "../Services/Creates/CreatePayeeService";
import { CreatePlannedExpenseService } from "../Services/Creates/CreatePlannedExpenseService";
import { CreateTransactionService } from "../Services/Creates/CreateTransactionService";
import { LinkExpenseToPayeeService } from "../Services/Links/LinkExpenseToPayeeService";
import { LinkExpenseToPlannedExpenseService } from "../Services/Links/LinkExpenseToPlannedExpenseService";
import { LinkTransactionToLedgerService } from "../Services/Links/LinkTransactionToLedgerService";
import { RequestAllocationTransactionService } from "../Services/Requests/RequestAllocationTransactionService";
import { RequestExpenseTransactionService } from "../Services/Requests/RequestExpenseTransactionService";
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
    CreateLedgerService.Instance,
    CreateAllocationService.Instance,
    CreateTransactionService.Instance,
    CreatePlannedExpenseService.Instance,
    CreateExpenseService.Instance,
    CreatePayeeService.Instance,
    LinkTransactionToLedgerService.Instance,
    LinkExpenseToPayeeService.Instance,
    LinkExpenseToPlannedExpenseService.Instance,
    RequestAllocationTransactionService.Instance,
    RequestExpenseTransactionService.Instance,
    UpdateLedgerBalanceService.Instance,
    UpdateLedgerStartingBalanceService.Instance,
  ];
}

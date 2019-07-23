import { CreateAccountService } from "../Services/CreateAccountService";
import { CreateAllocationService } from "../Services/CreateAllocationService";
import { CreateExpenseService } from "../Services/CreateExpenseService";
import { CreateLedgerService } from "../Services/CreateLedgerService";
import { CreatePayeeService } from "../Services/CreatePayeeService";
import { CreatePlannedExpenseService } from "../Services/CreatePlannedExpenseService";
import { CreateTransactionService } from "../Services/CreateTransactionService";
import { LinkExpenseToPayeeService } from "../Services/LinkExpenseToPayeeService";
import { LinkExpenseToPlannedExpenseService } from "../Services/LinkExpenseToPlannedExpenseService";
import { LinkTransactionToLedgerService } from "../Services/LinkTransactionToLedgerService";
import { RequestAllocationTransactionService } from "../Services/RequestAllocationTransactionService";
import { RequestExpenseTransactionService } from "../Services/RequestExpenseTransactionService";
import { UpdateLedgerBalanceService } from "../Services/UpdateLedgerBalanceService";
import { UpdateLedgerStartingBalanceService } from "../Services/UpdateLedgerStartingBalanceService";

export class Subscriptions {
  public static Create() {
    this.services.forEach((target) => {
      target.Instance.Subscribe();
    });
  }
  public static Release() {
    this.services.forEach((target) => {
      target.Instance.UnSubscribe();
    });
  }
  private static services = [
    CreateAccountService,
    CreateLedgerService,
    CreateAllocationService,
    CreateTransactionService,
    CreatePlannedExpenseService,
    CreateExpenseService,
    CreatePayeeService,
    LinkTransactionToLedgerService,
    LinkExpenseToPayeeService,
    LinkExpenseToPlannedExpenseService,
    RequestAllocationTransactionService,
    RequestExpenseTransactionService,
    UpdateLedgerBalanceService,
    UpdateLedgerStartingBalanceService,
  ];
}

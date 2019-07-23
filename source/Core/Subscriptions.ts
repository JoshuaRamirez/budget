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

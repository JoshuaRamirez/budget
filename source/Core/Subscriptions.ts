import { CreateAccountService } from "../Services/CreateAccountService";
import { CreateAllocationService } from "../Services/CreateAllocationService";
import { CreateExpenseService } from "../Services/CreateExpenseService";
import { CreateLedgerService } from "../Services/CreateLedgerService";
import { CreatePayeeService } from "../Services/CreatePayeeService";
import { CreatePlannedExpenseService } from "../Services/CreatePlannedExpenseService";
import { CreateTransactionService } from "../Services/CreateTransactionService";
import { LinkLedgerToTransactionService } from "../Services/LinkLedgerToTransactionService";
import { LinkPayeeToExpenseService } from "../Services/LinkPayeeToExpenseService";
import { LinkPlannedExpenseToExpenseService } from "../Services/LinkPlannedExpenseToExpenseService";
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
    LinkLedgerToTransactionService,
    LinkPayeeToExpenseService,
    LinkPlannedExpenseToExpenseService,
    RequestAllocationTransactionService,
    RequestExpenseTransactionService,
    UpdateLedgerBalanceService,
    UpdateLedgerStartingBalanceService,
  ];
}

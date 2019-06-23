import { CreateAccountService } from "../Services/CreateAccountService";
import { CreateAllocationService } from "../Services/CreateAllocationService";
import { CreateAllocationTransactionService } from "../Services/CreateAllocationTransactionService";
import { CreateExpenseService } from "../Services/CreateExpenseService";
import { CreateExpenseTransactionService } from "../Services/CreateExpenseTransactionService";
import { CreateLedgerService } from "../Services/CreateLedgerService";
import { CreatePayeeService } from "../Services/CreatePayeeService";
import { CreatePlannedExpenseService } from "../Services/CreatePlannedExpenseService";
import { CreateTransactionService } from "../Services/CreateTransactionService";
import { LinkLedgerToTransactionService } from "../Services/LinkLedgerToTransactionService";
import { LinkPayeeToExpenseService } from "../Services/LinkPayeeToExpenseService";
import { LinkPlannedExpenseToExpenseService } from "../Services/LinkPlannedExpenseToExpenseService";
import { UpdateLedgerBalanceService } from "../Services/UpdateLedgerBalanceService";
import { UpdateLedgerStartingBalanceService } from "../Services/UpdateLedgerStartingBalanceService";

export class Subscriptions {
  public static Create() {
    this.targets.forEach((target) => {
      target.Instance.Subscribe();
    });
  }
  public static Release() {
    this.targets.forEach((target) => {
      target.Instance.UnSubscribe();
    });
  }
  private static targets = [
    CreateAccountService,
    CreateAllocationTransactionService,
    CreateLedgerService,
    CreateAllocationService,
    CreateTransactionService,
    CreatePlannedExpenseService,
    CreateExpenseService,
    CreateExpenseTransactionService,
    CreatePayeeService,
    LinkPlannedExpenseToExpenseService,
    LinkLedgerToTransactionService,
    UpdateLedgerBalanceService,
    LinkPayeeToExpenseService,
    UpdateLedgerStartingBalanceService,
  ];
}

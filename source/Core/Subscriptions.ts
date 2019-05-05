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
import { LinkPlannedExpenseToExpenseService } from "../Services/LinkPlannedExpenseToExpenseService";
import { UpdateLedgerBalanceService } from "../Services/UpdateLedgerBalanceService";

export class Subscriptions {
  public Create() {
    CreateAccountService.Instance.Subscribe();
    CreateAllocationTransactionService.Instance.Subscribe();
    CreateLedgerService.Instance.Subscribe();
    CreateAllocationService.Instance.Subscribe();
    CreateTransactionService.Instance.Subscribe();
    CreatePlannedExpenseService.Instance.Subscribe();
    CreateExpenseService.Instance.Subscribe();
    CreateExpenseTransactionService.Instance.Subscribe();
    CreatePayeeService.Instance.Subscribe();
    LinkPlannedExpenseToExpenseService.Instance.Subscribe();
    LinkLedgerToTransactionService.Instance.Subscribe();
    UpdateLedgerBalanceService.Instance.Subscribe();
  }
}

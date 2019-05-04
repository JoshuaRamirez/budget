import { CreateAccountService } from "../Services/CreateAccountService";
import { CreateAllocationService } from "../Services/CreateAllocationService";
import { CreateAllocationTransactionService } from "../Services/CreateAllocationTransactionService";
import { CreateExpenseService } from "../Services/CreateExpenseService";
import { CreateExpenseTransactionService } from "../Services/CreateExpenseTransactionService";
import { CreateLedgerService } from "../Services/CreateLedgerService";
import { CreatePlannedExpenseService } from "../Services/CreatePlannedExpenseService";
import { CreateTransactionService } from "../Services/CreateTransactionService";

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
  }
}

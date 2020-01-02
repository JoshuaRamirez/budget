import { PlannedDepositCreatedEvent } from "../../Events/Created/PlannedDepositCreatedEvent";
import { PlannedExpenseCreatedEvent } from "../../Events/Created/PlannedExpenseCreatedEvent";
import { PlannedTransactionRequestedEvent } from "../../Events/Requested/Creation/PlannedTransactionRequestedEvent";
import { IPlannedTransaction } from "../../Projections/Core/IPlannedTransaction";
import { PlannedDepositProjection } from "../../Projections/PlannedDepositProjection";
import { PlannedExpenseProjection } from "../../Projections/PlannedExpenseProjection";
import { Continuation } from "../Core/Continuation";
import { ContinuationReceiver } from "../Core/ContinuationReceiver";

export class RequestPlannedTransactionService extends Continuation {
  public static Instance = new RequestPlannedTransactionService();
  constructor() {
    super();
    const map = (plannedItem: IPlannedTransaction, transactionType: string) => {
      const plannedTransactionRequestedEvent = new PlannedTransactionRequestedEvent();
      plannedTransactionRequestedEvent.Amount = plannedItem.Amount;
      plannedTransactionRequestedEvent.Description = plannedItem.Description;
      plannedTransactionRequestedEvent.RepeatCount = plannedItem.RepeatCount;
      plannedTransactionRequestedEvent.RepeatMeasurement = plannedItem.RepeatMeasurement;
      plannedTransactionRequestedEvent.RepeatPeriod = plannedItem.RepeatPeriod;
      plannedTransactionRequestedEvent.RepeatStart = plannedItem.StartDate;
      plannedTransactionRequestedEvent.TransactionType = transactionType;
      return plannedTransactionRequestedEvent;
    };
    const continuationFromDeposit = new ContinuationReceiver(PlannedDepositCreatedEvent, (subjectEvent: PlannedDepositCreatedEvent) => {
      const subject = PlannedDepositProjection.Get(subjectEvent.PlannedDepositId);
      const targetEvent = map(subject, "Deposit");
      return targetEvent;
    });
    const continuationFromExpense = new ContinuationReceiver(PlannedExpenseCreatedEvent, (subjectEvent: PlannedExpenseCreatedEvent) => {
      const subject = PlannedExpenseProjection.Get(subjectEvent.PlannedExpenseId);
      const targetEvent = map(subject, "Expense");
      return targetEvent;
    });
    this.Link(continuationFromDeposit);
    this.Link(continuationFromExpense);
  }
}

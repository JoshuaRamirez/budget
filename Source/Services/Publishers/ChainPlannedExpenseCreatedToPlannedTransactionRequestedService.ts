import { PlannedExpenseCreatedEvent } from "../../Events/Created/PlannedExpenseCreatedEvent";
import { PlannedTransactionRequestedEvent } from "../../Events/Requested/Creation/PlannedTransactionRequestedEvent";
import { PlannedExpenseProjection } from "../../Projections/PlannedExpenseProjection";
import { Continuation } from "../Core/Continuation";
import { ContinuationHandler } from "../Core/ContinuationHandler";

export class ChainPlannedExpenseCreatedToPlannedTransactionRequestedService extends Continuation {
  public static Instance = new ChainPlannedExpenseCreatedToPlannedTransactionRequestedService();
  constructor() {
    super();
    const continuationHandler = new ContinuationHandler(PlannedExpenseCreatedEvent, (subjectEvent: PlannedExpenseCreatedEvent) => {
      const subject = PlannedExpenseProjection.Get(subjectEvent.PlannedExpenseId);
      const targetEvent = new PlannedTransactionRequestedEvent();
      targetEvent.Amount = subject.Amount;
      targetEvent.Description = subject.Description;
      targetEvent.RepeatCount = subject.RepeatCount;
      targetEvent.RepeatMeasurement = subject.RepeatMeasurement;
      targetEvent.RepeatPeriod = subject.RepeatPeriod;
      targetEvent.RepeatStart = subject.StartDate;
      targetEvent.TransactionType = "Expense";
      return targetEvent;
    });
    this.Link(continuationHandler);
  }
}

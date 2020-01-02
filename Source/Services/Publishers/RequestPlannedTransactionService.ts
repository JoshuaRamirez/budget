import { PlannedDepositCreatedEvent } from "../../Events/PlannedDepositCreatedEvent";
import { PlannedTransactionCreationRequestedEvent } from "../../Events/PlannedTransactionCreationRequestedEvent";
import { PlannedDepositProjection } from "../../Projections/PlannedDepositProjection";
import { Continuation } from "../Core/Continuation";
import { ContinuationHandler } from "../Core/ContinuationHandler";

export class RequestPlannedTransactionService extends Continuation {
  public static Instance = new RequestPlannedTransactionService();
  constructor() {
    super();
    const continuationHandler = new ContinuationHandler(PlannedDepositCreatedEvent, (subjectEvent: PlannedDepositCreatedEvent) => {
      const subject = PlannedDepositProjection.Get(subjectEvent.PlannedDepositId);
      const targetEvent = new PlannedTransactionCreationRequestedEvent();
      targetEvent.Amount = subject.Amount;
      targetEvent.Description = subject.Description;
      targetEvent.RepeatCount = subject.RepeatCount;
      targetEvent.RepeatMeasurement = subject.RepeatMeasurement;
      targetEvent.RepeatPeriod = subject.RepeatPeriod;
      targetEvent.RepeatStart = subject.StartDate;
      targetEvent.TransactionType = "Deposit";
      return targetEvent;
    });
    this.Link(continuationHandler);
  }
}

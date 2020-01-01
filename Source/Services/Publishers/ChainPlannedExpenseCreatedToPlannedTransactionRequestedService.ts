import { PlannedExpenseCreatedEvent } from "../../Events/PlannedExpenseCreatedEvent";
import { PlannedTransactionCreationRequestedEvent } from "../../Events/PlannedTransactionCreationRequestedEvent";
import { PlannedExpenseProjection } from "../../Projections/PlannedExpenseProjection";
import { EventChain } from "../Core/EventChain";
import { EventLink } from "../Core/EventLink";

export class ChainPlannedExpenseCreatedToPlannedTransactionRequestedService extends EventChain {
  public static Instance = new ChainPlannedExpenseCreatedToPlannedTransactionRequestedService();
  constructor() {
    super();
    const eventLink = new EventLink(PlannedExpenseCreatedEvent, (subjectEvent: PlannedExpenseCreatedEvent) => {
      const subject = PlannedExpenseProjection.Get(subjectEvent.PlannedExpenseId);
      const targetEvent = new PlannedTransactionCreationRequestedEvent();
      targetEvent.Amount = subject.Amount;
      targetEvent.Description = subject.Description;
      targetEvent.RepeatCount = subject.RepeatCount;
      targetEvent.RepeatMeasurement = subject.RepeatMeasurement;
      targetEvent.RepeatPeriod = subject.RepeatPeriod;
      targetEvent.RepeatStart = subject.StartDate;
      targetEvent.TransactionType = "Expense";
      return targetEvent;
    });
    this.Link(eventLink);
  }
}

import { PlannedDepositCreatedEvent } from "../../Events/PlannedDepositCreatedEvent";
import { PlannedTransactionCreationRequestedEvent } from "../../Events/PlannedTransactionCreationRequestedEvent";
import { PlannedDepositProjection } from "../../Projections/PlannedDepositProjection";
import { Continuation } from "../Core/Continuation";
import { EventLink } from "../Core/EventLink";

export class ChainPlannedDepositCreatedToPlannedTransactionRequestedService extends Continuation {
  public static Instance = new ChainPlannedDepositCreatedToPlannedTransactionRequestedService();
  constructor() {
    super();
    const eventLink = new EventLink(PlannedDepositCreatedEvent, (subjectEvent: PlannedDepositCreatedEvent) => {
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
    this.Link(eventLink);
  }
}

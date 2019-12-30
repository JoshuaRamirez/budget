import { PlannedDepositCreatedEvent } from "../../Events/PlannedDepositCreatedEvent";
import { PlannedTransactionCreationRequestedEvent } from "../../Events/PlannedTransactionCreationRequestedEvent";
import { PlannedDepositProjection } from "../../Projections/PlannedDepositProjection";
import { EventChain } from "../Core/EventChain";
import { EventLink } from "../Core/EventLink";

export class ChainPlannedDepositCreatedToPlannedTransactionRequestedService extends EventChain {
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
      targetEvent.RepeatStart = subject.RepeatStart;
      targetEvent.TransactionType = "Deposit";
      return targetEvent;
    });
    this.Link(eventLink);
  }
}

import { DailyTimerIntervalPublishedEvent } from "../../Events/System/DailyTimerIntervalPublishedEvent";
import { MapPlannedTransactionToProposedTransactionCreationRequested } from "../../Projections/Core/Mappers";
import { PlannedTransactionProjection } from "../../Projections/PlannedTransactionProjection";
import { Receiver } from "../Core/Receiver";
import { TransactionProposition } from "./Core/TransactionProposition";

export class ProposeTransactionsForToday extends Receiver<DailyTimerIntervalPublishedEvent> {
  public static Instance: ProposeTransactionsForToday = new ProposeTransactionsForToday();
  constructor() {
    super(DailyTimerIntervalPublishedEvent);
  }
  public Receive(event: DailyTimerIntervalPublishedEvent): void {
    const plannedTransactionProjections = PlannedTransactionProjection.All();
    plannedTransactionProjections.forEach(plannedTransactionProjection => {
      const proposedDate = TransactionProposition.GetProposedDate(plannedTransactionProjection);
      const proposedTransactionCreationRequestedEvent = MapPlannedTransactionToProposedTransactionCreationRequested(plannedTransactionProjection, proposedDate);
      if (proposedTransactionCreationRequestedEvent) {
        proposedTransactionCreationRequestedEvent.Publish();
      }
    });
  }
}

import { DailyTimerIntervalPublished } from "../../Events/System/DailyTimerIntervalPublished";
import { MapPlannedTransactionToProposedTransactionCreationRequested } from "../../Projections/Core/Mappers";
import { PlannedTransactionProjection } from "../../Projections/PlannedTransactionProjection";
import { Receiver } from "../Core/Receiver";
import { TransactionProposition } from "./Core/TransactionProposition";

export class ProposeTransactionsForToday extends Receiver<DailyTimerIntervalPublished> {
  public static Instance: ProposeTransactionsForToday = new ProposeTransactionsForToday();
  constructor() {
    super(DailyTimerIntervalPublished);
  }
  public Receive(event: DailyTimerIntervalPublished): void {
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

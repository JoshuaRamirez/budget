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
  public async Receive(event: DailyTimerIntervalPublishedEvent): Promise<void> {
    const plannedTransactionProjections = await PlannedTransactionProjection.All();
    for (const plannedTransactionProjection of plannedTransactionProjections) {
      const proposedDate = await TransactionProposition.GetProposedDate(plannedTransactionProjection);
      const proposedTransactionCreationRequestedEvent = MapPlannedTransactionToProposedTransactionCreationRequested(plannedTransactionProjection, proposedDate);
      if (proposedTransactionCreationRequestedEvent) {
        await proposedTransactionCreationRequestedEvent.Publish();
      }
    }
    return new Promise((resolve, reject) => resolve());
  }
}

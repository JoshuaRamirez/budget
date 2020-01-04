import { PlannedTransactionRequestedEvent } from "../../Events/Requested/Creation/PlannedTransactionRequestedEvent";
import { ProposedTransactionRequestedEvent } from "../../Events/Requested/Creation/ProposedTransactionRequestedEvent";
import { PlannedTransactionProjection } from "../PlannedTransactionProjection";
import { IPlannedTransaction } from "./IPlannedTransaction";

export const MapPlannedItemToPlannedTransaction = (plannedItem: IPlannedTransaction, transactionType: string) => {
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
export function MapPlannedTransactionToProposedTransactionCreationRequested(plannedTransactionProjection: PlannedTransactionProjection, proposedDate: Date) {
  const proposedTransactionCreationRequestedEvent = new ProposedTransactionRequestedEvent();
  proposedTransactionCreationRequestedEvent.Amount = plannedTransactionProjection.Amount;
  proposedTransactionCreationRequestedEvent.Description = plannedTransactionProjection.Description;
  proposedTransactionCreationRequestedEvent.PlannedTransactionId = plannedTransactionProjection.Id;
  proposedTransactionCreationRequestedEvent.Date = proposedDate;
  return proposedTransactionCreationRequestedEvent;
}

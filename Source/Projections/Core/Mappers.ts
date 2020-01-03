import { PlannedTransactionRequestedEvent } from "../../Events/Requested/Creation/PlannedTransactionRequestedEvent";
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

import { PlannedDepositCreatedEvent } from "../../../Events/Created/PlannedDepositCreatedEvent";
import { PlannedExpenseCreatedEvent } from "../../../Events/Created/PlannedExpenseCreatedEvent";
import { PlannedTransactionCreatedEvent } from "../../../Events/Created/PlannedTransactionCreatedEvent";
import {
  MapPlannedItemToPlannedTransaction,
  MapPlannedTransactionToProposedTransactionCreationRequested
} from "../../../Projections/Core/Mappers";
import { PlannedDepositProjection } from "../../../Projections/PlannedDepositProjection";
import { PlannedExpenseProjection } from "../../../Projections/PlannedExpenseProjection";
import { PlannedTransactionProjection } from "../../../Projections/PlannedTransactionProjection";
import { TransactionProposition } from "../../Domain/Core/TransactionProposition";

export function ConvertPlannedTransactionCreatedToProposedTransactionCreationRequested(plannedTransactionCreatedEvent: PlannedTransactionCreatedEvent) {
  const plannedTransactionProjection = PlannedTransactionProjection.Get(plannedTransactionCreatedEvent.PlannedTransactionId);
  const proposedDate = TransactionProposition.GetProposedDate(plannedTransactionProjection);
  if (!proposedDate) { return; }
  const proposedTransactionCreationRequestedEvent = MapPlannedTransactionToProposedTransactionCreationRequested(plannedTransactionProjection, proposedDate);
  return proposedTransactionCreationRequestedEvent;
}

export function ConvertPlannedDepositCreatedToPlannedTransactionRequested(plannedDepositCreatedEvent: PlannedDepositCreatedEvent) {
  const plannedDepositProjection = PlannedDepositProjection.Get(plannedDepositCreatedEvent.PlannedDepositId);
  const plannedTransactionRequestedEvent = MapPlannedItemToPlannedTransaction(plannedDepositProjection, "Deposit");
  return plannedTransactionRequestedEvent;
}

export function ConvertPlannedExpenseCreatedToPlannedTransactionRequested(plannedExpenseCreatedEvent: PlannedExpenseCreatedEvent) {
  const plannedExpenseProjection = PlannedExpenseProjection.Get(plannedExpenseCreatedEvent.PlannedExpenseId);
  const plannedTransactionRequestedEvent = MapPlannedItemToPlannedTransaction(plannedExpenseProjection, "Expense");
  return plannedTransactionRequestedEvent;
}


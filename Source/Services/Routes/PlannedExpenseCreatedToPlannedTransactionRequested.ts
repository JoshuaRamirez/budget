import { PlannedExpenseCreatedEvent } from "../../Events/Created/PlannedExpenseCreatedEvent";
import { PlannedTransactionRequestedEvent } from "../../Events/Requested/Creation/PlannedTransactionRequestedEvent";
import { MapPlannedItemToPlannedTransaction } from "../../Projections/Core/Mappers";
import { PlannedExpenseProjection } from "../../Projections/PlannedExpenseProjection";
import { Route } from "../Core/Route";
import { Router } from "../Core/Router";

export class PlannedExpenseCreatedToPlannedTransactionRequested extends Route<PlannedExpenseCreatedEvent, PlannedTransactionRequestedEvent> {
  public static Instance = new PlannedExpenseCreatedToPlannedTransactionRequested();
  constructor() {
    super(PlannedExpenseCreatedEvent, (plannedExpenseCreatedEvent) => {
      const plannedExpenseProjection = PlannedExpenseProjection.Get(plannedExpenseCreatedEvent.PlannedExpenseId);
      const plannedTransactionRequestedEvent = MapPlannedItemToPlannedTransaction(plannedExpenseProjection, "Expense");
      return plannedTransactionRequestedEvent;
    });
    Router.Instance.Link(this);
  }
}

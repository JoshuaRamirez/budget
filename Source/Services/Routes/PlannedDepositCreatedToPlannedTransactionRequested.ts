import { PlannedDepositCreatedEvent } from "../../Events/Created/PlannedDepositCreatedEvent";
import { PlannedTransactionRequestedEvent } from "../../Events/Requested/Creation/PlannedTransactionRequestedEvent";
import { MapPlannedItemToPlannedTransaction } from "../../Projections/Core/Mappers";
import { PlannedDepositProjection } from "../../Projections/PlannedDepositProjection";
import { Route } from "../Core/Route";
import { Router } from "../Core/Router";

export class PlannedDepositCreatedToPlannedTransactionRequested extends Route<PlannedDepositCreatedEvent, PlannedTransactionRequestedEvent> {
  public static Instance = new PlannedDepositCreatedToPlannedTransactionRequested();
  constructor() {
    super(PlannedDepositCreatedEvent, (plannedDepositCreatedEvent) => {
      const plannedDepositProjection = PlannedDepositProjection.Get(plannedDepositCreatedEvent.PlannedDepositId);
      const plannedTransactionRequestedEvent = MapPlannedItemToPlannedTransaction(plannedDepositProjection, "Deposit");
      return plannedTransactionRequestedEvent;
    });
    Router.Instance.Link(this);
  }
}

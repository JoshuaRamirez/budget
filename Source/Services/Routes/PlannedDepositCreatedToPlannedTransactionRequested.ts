import { PlannedDepositCreatedEvent } from "../../Events/Created/PlannedDepositCreatedEvent";
import { PlannedTransactionRequestedEvent } from "../../Events/Requested/Creation/PlannedTransactionRequestedEvent";
import { Route } from "../Core/Route";
import { Router } from "../Core/Router";
import { ConvertPlannedDepositCreatedToPlannedTransactionRequested } from "./Core/Conversions";

export class PlannedDepositCreatedToPlannedTransactionRequested extends Route<PlannedDepositCreatedEvent, PlannedTransactionRequestedEvent> {
  public static Instance = new PlannedDepositCreatedToPlannedTransactionRequested();
  constructor() {
    super(PlannedDepositCreatedEvent, ConvertPlannedDepositCreatedToPlannedTransactionRequested);
    Router.Instance.Link(this);
  }
}

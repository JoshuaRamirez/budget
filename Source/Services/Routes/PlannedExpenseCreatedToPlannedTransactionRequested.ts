import { PlannedExpenseCreatedEvent } from "../../Events/Created/PlannedExpenseCreatedEvent";
import { PlannedTransactionRequestedEvent } from "../../Events/Requested/Creation/PlannedTransactionRequestedEvent";
import { Route } from "../Core/Route";
import { Router } from "../Core/Router";
import { ConvertPlannedExpenseCreatedToPlannedTransactionRequested } from "./Core/Conversions";

export class PlannedExpenseCreatedToPlannedTransactionRequested extends Route<PlannedExpenseCreatedEvent, PlannedTransactionRequestedEvent> {
  public static Instance = new PlannedExpenseCreatedToPlannedTransactionRequested();
  constructor() {
    super(PlannedExpenseCreatedEvent, ConvertPlannedExpenseCreatedToPlannedTransactionRequested);
    Router.Instance.Link(this);
  }
}

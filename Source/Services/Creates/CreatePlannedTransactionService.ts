import { PlannedTransactionCreatedEvent } from "../../Events/Created/PlannedTransactionCreatedEvent";
import { PlannedTransactionCreationRequestedEvent } from "../../Events/Requested/Creation/PlannedTransactionCreationRequestedEvent";
import { PlannedTransactionProjection } from "../../Projections/PlannedTransactionProjection";
import { Handler } from "../Core/Handler";


export class CreatePlannedTransactionService extends Handler<PlannedTransactionCreationRequestedEvent>  {
  public static Instance = new CreatePlannedTransactionService();
  private constructor() {
    super(PlannedTransactionCreationRequestedEvent);
  }
  public Handle(event: PlannedTransactionCreationRequestedEvent) {
    // Create PlannedTransactionProjection
    const plannedTransactionProjection = new PlannedTransactionProjection();
    plannedTransactionProjection.Amount = event.Amount;
    plannedTransactionProjection.Description = event.Description;
    plannedTransactionProjection.RepeatCount = event.RepeatCount;
    plannedTransactionProjection.RepeatMeasurement = event.RepeatMeasurement;
    plannedTransactionProjection.RepeatPeriod = event.RepeatPeriod;
    plannedTransactionProjection.StartDate = event.RepeatStart;
    plannedTransactionProjection.TransactionType = event.TransactionType;
    plannedTransactionProjection.Project();
    // Publish PlannedTransactionCreatedEvent
    const plannedTransactionCreatedEvent = new PlannedTransactionCreatedEvent();
    plannedTransactionCreatedEvent.PlannedTransactionId = plannedTransactionProjection.Id;
    plannedTransactionCreatedEvent.Publish();
  }
}

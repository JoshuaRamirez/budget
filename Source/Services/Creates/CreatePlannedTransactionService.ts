import { PlannedTransactionCreatedEvent } from "../../Events/Created/PlannedTransactionCreatedEvent";
import { PlannedTransactionRequestedEvent } from "../../Events/Requested/Creation/PlannedTransactionRequestedEvent";
import { PlannedTransactionProjection } from "../../Projections/PlannedTransactionProjection";
import { Handler } from "../Core/Handler";


export class CreatePlannedTransactionService extends Handler<PlannedTransactionRequestedEvent>  {
  public static Instance = new CreatePlannedTransactionService();
  private constructor() {
    super(PlannedTransactionRequestedEvent);
  }
  public Handle(event: PlannedTransactionRequestedEvent) {
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

import { PlannedExpenseCreatedEvent } from "../../Events/Created/PlannedExpenseCreatedEvent";
import { PlannedExpenseRequestedEvent } from "../../Events/Requested/Creation/PlannedExpenseRequestedEvent";
import { PlannedExpenseProjection } from "../../Projections/PlannedExpenseProjection";
import { Handler } from "../Core/Handler";

export class CreatePlannedExpenseService extends Handler<PlannedExpenseRequestedEvent> {
  public static Instance = new CreatePlannedExpenseService();
  private constructor() {
    super(PlannedExpenseRequestedEvent);
  }
  public Handle(event: PlannedExpenseRequestedEvent) {
    // Create PlannedExpenseProjection
    const plannedExpenseProjection = new PlannedExpenseProjection();
    plannedExpenseProjection.Amount = event.Amount;
    plannedExpenseProjection.Description = event.Description;
    plannedExpenseProjection.ExpenseIds = [];
    plannedExpenseProjection.RepeatCount = event.RepeatCount;
    plannedExpenseProjection.RepeatMeasurement = event.RepeatMeasurement;
    plannedExpenseProjection.RepeatPeriod = event.RepeatPeriod;
    plannedExpenseProjection.StartDate = event.RepeatStart;
    plannedExpenseProjection.Project();
    // Publish PlannedExpenseCreated Event
    const plannedExpenseCreatedEvent = new PlannedExpenseCreatedEvent();
    plannedExpenseCreatedEvent.PlannedExpenseId = plannedExpenseProjection.Id;
    plannedExpenseCreatedEvent.Publish();
  }
}

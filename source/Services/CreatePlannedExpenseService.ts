import { Handler } from "../Core/Handler";
import { PlannedExpenseRequestedEvent } from "../Events/PlannedExpenseRequestedEvent";
import { PlannedExpenseProjection } from "../Projections/PlannedExpenseProjection";

export class CreatePlannedExpenseService extends Handler<PlannedExpenseRequestedEvent> {
  public static Instance = new CreatePlannedExpenseService();
  constructor() {
    super(PlannedExpenseRequestedEvent);
  }
  public Process(event: PlannedExpenseRequestedEvent) {
    // Create PlannedExpenseProjection
    const plannedExpenseProjection = new PlannedExpenseProjection();
    plannedExpenseProjection.Description = event.Description;
    plannedExpenseProjection.ExpenseIds = [];
    plannedExpenseProjection.RepeatCount = event.RepeatCount;
    plannedExpenseProjection.RepeatMeasurement = event.RepeatMeasurement;
    plannedExpenseProjection.RepeatPeriod = event.RepeatPeriod;
    plannedExpenseProjection.RepeatStart = event.RepeatStart;
    plannedExpenseProjection.Project();
    return plannedExpenseProjection;
  }
}

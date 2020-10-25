import { PlannedExpenseCreatedEvent } from "../../Events/Created/PlannedExpenseCreatedEvent";
import { PlannedExpenseRequestedEvent } from "../../Events/Requested/Creation/PlannedExpenseRequestedEvent";
import { PlannedExpenseProjection } from "../../Projections/PlannedExpenseProjection";
import { Receiver } from "../Core/Receiver";

export class CreatePlannedExpenseService extends Receiver<PlannedExpenseRequestedEvent> {
  public static Instance = new CreatePlannedExpenseService();
  private constructor() {
    super(PlannedExpenseRequestedEvent);
  }
  public async Receive(event: PlannedExpenseRequestedEvent): Promise<void> {
    // Create PlannedExpenseProjection
    const plannedExpenseProjection = new PlannedExpenseProjection();
    plannedExpenseProjection.Amount = event.Amount;
    plannedExpenseProjection.Description = event.Description;
    plannedExpenseProjection.ExpenseIds = [];
    plannedExpenseProjection.RepeatCount = event.RepeatCount;
    plannedExpenseProjection.RepeatMeasurement = event.RepeatMeasurement;
    plannedExpenseProjection.RepeatPeriod = event.RepeatPeriod;
    plannedExpenseProjection.StartDate = event.RepeatStart;
    await plannedExpenseProjection.Project();
    // Publish PlannedExpenseCreated Event
    const plannedExpenseCreatedEvent = new PlannedExpenseCreatedEvent();
    plannedExpenseCreatedEvent.PlannedExpenseId = plannedExpenseProjection.Id;
    await plannedExpenseCreatedEvent.Publish();
    return new Promise((resolve, reject) => resolve());
  }
}

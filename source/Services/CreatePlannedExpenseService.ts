import { ISubscriber } from "../Core/ISubscriber";
import { ProjectionStore } from "../Core/ProjectionStore";
import { Publisher } from "../Core/Publisher";
import { PlannedExpenseRequestedEvent } from "../Events/PlannedExpenseRequestedEvent";
import { PlannedExpenseProjection } from "../Projections/PlannedExpenseProjection";

export class CreatePlannedExpenseService implements ISubscriber<PlannedExpenseRequestedEvent> {
  public static Instance = new CreatePlannedExpenseService();
  public Process(event: PlannedExpenseRequestedEvent) {
    const plannedExpenseProjection = new PlannedExpenseProjection();
    plannedExpenseProjection.Description = event.Description;
    plannedExpenseProjection.ExpenseIds = [];
    plannedExpenseProjection.Name = event.Name;
    plannedExpenseProjection.RepeatCount = event.RepeatCount;
    plannedExpenseProjection.RepeatMeasurement = event.RepeatMeasurement;
    plannedExpenseProjection.RepeatPeriod = event.RepeatPeriod;
    plannedExpenseProjection.RepeatStart = event.RepeatStart;
    ProjectionStore.Instance.Project(plannedExpenseProjection);
    return plannedExpenseProjection;
  }
  public Subscribe() {
    Publisher.Instance.Subscribe(PlannedExpenseRequestedEvent, this);
  }
}

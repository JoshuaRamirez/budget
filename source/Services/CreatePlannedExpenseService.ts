import { ISubscriber } from "../Core/ISubscriber";
import { Publisher } from "../Core/Publisher";
import { PlannedExpenseRequestedEvent } from "../Events/PlannedExpenseRequestedEvent";
import { PlannedExpenseProjection } from "../Projections/PlannedExpenseProjection";

export class CreatePlannedExpenseService implements ISubscriber<PlannedExpenseRequestedEvent> {
  public static Instance = new CreatePlannedExpenseService();
  private handles = [];
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
  public Subscribe() {
    const handle = Publisher.Instance.Subscribe(PlannedExpenseRequestedEvent, this);
    this.handles.push(handle);
  }
  public UnSubscribe() {
    this.handles.forEach((handle) => {
      Publisher.Instance.UnSubscribe(PlannedExpenseRequestedEvent, handle);
    });
  }
}

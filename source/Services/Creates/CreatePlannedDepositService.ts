import { Handler } from "../../Core/Handler";
import { PlannedDepositRequestedEvent } from "../../Events/PlannedDepositRequestedEvent";
import { PlannedDepositProjection } from "../../Projections/PlannedDepositProjection";

export class CreatePlannedDepositService extends Handler<PlannedDepositRequestedEvent> {
  public static Instance = new CreatePlannedDepositService();
  private constructor() {
    super(PlannedDepositRequestedEvent);
  }
  public Process(event: PlannedDepositRequestedEvent) {
    // Create PlannedDepositProjection
    const plannedDepositProjection = new PlannedDepositProjection();
    plannedDepositProjection.Amount = event.Amount;
    plannedDepositProjection.Description = event.Description;
    plannedDepositProjection.DepositIds = [];
    plannedDepositProjection.RepeatCount = event.RepeatCount;
    plannedDepositProjection.RepeatMeasurement = event.RepeatMeasurement;
    plannedDepositProjection.RepeatPeriod = event.RepeatPeriod;
    plannedDepositProjection.RepeatStart = event.RepeatStart;
    plannedDepositProjection.Project();
    return plannedDepositProjection;
  }
}

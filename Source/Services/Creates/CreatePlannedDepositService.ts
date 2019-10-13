import { PlannedDepositRequestedEvent } from "../../Events/PlannedDepositRequestedEvent";
import { PlannedDepositProjection } from "../../Projections/PlannedDepositProjection";
import { Handler } from "../Core/Handler";

export class CreatePlannedDepositService extends Handler<PlannedDepositRequestedEvent> {
  public static Instance = new CreatePlannedDepositService();
  private constructor() {
    super(PlannedDepositRequestedEvent);
  }
  public Handle(event: PlannedDepositRequestedEvent) {
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

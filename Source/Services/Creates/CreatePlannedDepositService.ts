import { PlannedDepositCreatedEvent } from "../../Events/Created/PlannedDepositCreatedEvent";
import { PlannedDepositRequestedEvent } from "../../Events/Requested/Creation/PlannedDepositRequestedEvent";
import { PlannedDepositProjection } from "../../Projections/PlannedDepositProjection";
import { Receiver } from "../Core/Receiver";

export class CreatePlannedDepositService extends Receiver<PlannedDepositRequestedEvent> {
  public static Instance = new CreatePlannedDepositService();
  private constructor() {
    super(PlannedDepositRequestedEvent);
  }
  public Receive(event: PlannedDepositRequestedEvent) {
    // Create PlannedDepositProjection
    const plannedDepositProjection = new PlannedDepositProjection();
    plannedDepositProjection.Amount = event.Amount;
    plannedDepositProjection.Description = event.Description;
    plannedDepositProjection.DepositIds = [];
    plannedDepositProjection.RepeatCount = event.RepeatCount;
    plannedDepositProjection.RepeatMeasurement = event.RepeatMeasurement;
    plannedDepositProjection.RepeatPeriod = event.RepeatPeriod;
    plannedDepositProjection.StartDate = event.RepeatStart;
    plannedDepositProjection.Project();
    // Publish PlannedExpenseCreated Event
    const plannedDepositCreatedEvent = new PlannedDepositCreatedEvent();
    plannedDepositCreatedEvent.PlannedDepositId = plannedDepositProjection.Id;
    plannedDepositCreatedEvent.Publish();
  }
}

import { Handler } from "../../Core/Handler";
import { DepositRequestedEvent } from "../../Events/DepositRequestedEvent";
import { DepositProjection } from "../../Projections/DepositProjection";

export class CreateDepositService extends Handler<DepositRequestedEvent> {
  public static Instance = new CreateDepositService();
  private constructor() {
    super(DepositRequestedEvent);
  }
  public Process(event: DepositRequestedEvent) {
    // Create DepositProjection
    const depositProjection = new DepositProjection();
    depositProjection.CategoryId = event.CategoryId;
    depositProjection.Description = event.Description;
    depositProjection.LedgerId = event.LedgerId;
    depositProjection.PayerId = event.PayerId;
    depositProjection.PlannedDepositId = event.PlannedDepositId;
    depositProjection.TransactionId = event.TransactionId;
    depositProjection.Project();
  }
}

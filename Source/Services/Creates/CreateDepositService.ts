import { DepositCreatedEvent } from "../../Events/Created/DepositCreatedEvent";
import { DepositRequestedEvent } from "../../Events/Requested/Creation/DepositRequestedEvent";
import { DepositProjection } from "../../Projections/DepositProjection";
import { Handler } from "../Core/Handler";

export class CreateDepositService extends Handler<DepositRequestedEvent> {
  public static Instance = new CreateDepositService();
  private constructor() {
    super(DepositRequestedEvent);
  }
  public Receive(event: DepositRequestedEvent) {
    // Create DepositProjection
    const depositProjection = new DepositProjection();
    depositProjection.CategoryId = event.CategoryId;
    depositProjection.Description = event.Description;
    depositProjection.LedgerId = event.LedgerId;
    depositProjection.PayerId = event.PayerId;
    depositProjection.PlannedDepositId = event.PlannedDepositId;
    depositProjection.TransactionId = event.TransactionId;
    depositProjection.Project();
    // Publish DepositCreatedEvent
    const depositCreatedEvent = new DepositCreatedEvent();
    depositCreatedEvent.DepositId = depositProjection.Id;
    depositCreatedEvent.Publish();
  }
}

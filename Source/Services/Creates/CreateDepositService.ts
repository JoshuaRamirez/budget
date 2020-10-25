import { DepositCreatedEvent } from "../../Events/Created/DepositCreatedEvent";
import { DepositRequestedEvent } from "../../Events/Requested/Creation/DepositRequestedEvent";
import { DepositProjection } from "../../Projections/DepositProjection";
import { Receiver } from "../Core/Receiver";

export class CreateDepositService extends Receiver<DepositRequestedEvent> {
  public static Instance = new CreateDepositService();
  private constructor() {
    super(DepositRequestedEvent);
  }
  public async Receive(event: DepositRequestedEvent): Promise<void> {
    // Create DepositProjection
    const depositProjection = new DepositProjection();
    depositProjection.CategoryId = event.CategoryId;
    depositProjection.Description = event.Description;
    depositProjection.LedgerId = event.LedgerId;
    depositProjection.PayerId = event.PayerId;
    depositProjection.PlannedDepositId = event.PlannedDepositId;
    depositProjection.TransactionId = event.TransactionId;
    await depositProjection.Project();
    // Publish DepositCreatedEvent
    const depositCreatedEvent = new DepositCreatedEvent();
    depositCreatedEvent.DepositId = depositProjection.Id;
    await depositCreatedEvent.Publish();
    return new Promise((resolve, reject) => resolve());
  }
}

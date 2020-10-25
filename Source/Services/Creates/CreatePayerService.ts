import { PayerRequestedEvent } from "../../Events/Requested/Creation/PayerRequestedEvent";
import { PayerProjection } from "../../Projections/PayerProjection";
import { Receiver } from "../Core/Receiver";

export class CreatePayerService extends Receiver<PayerRequestedEvent> {
  public static Instance = new CreatePayerService();
  private constructor() {
    super(PayerRequestedEvent);
  }
  public async Receive(event: PayerRequestedEvent): Promise<void> {
    // Create PayerProjection
    const payerProjection = new PayerProjection();
    payerProjection.Description = event.Description;
    payerProjection.PayerName = event.PayerName;
    payerProjection.Type = event.Type;
    await payerProjection.Project();
    return new Promise((resolve, reject) => resolve());
  }
}

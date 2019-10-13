import { PayerRequestedEvent } from "../../Events/PayerRequestedEvent";
import { PayerProjection } from "../../Projections/PayerProjection";
import { Handler } from "../Core/Handler";

export class CreatePayerService extends Handler<PayerRequestedEvent> {
  public static Instance = new CreatePayerService();
  private constructor() {
    super(PayerRequestedEvent);
  }
  public Handle(event: PayerRequestedEvent) {
    // Create PayerProjection
    const payerProjection = new PayerProjection();
    payerProjection.Description = event.Description;
    payerProjection.PayerName = event.PayerName;
    payerProjection.Type = event.Type;
    payerProjection.Project();
    return payerProjection;
  }
}

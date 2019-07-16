import { Handler } from "../Core/Handler";
import { PayeeRequestedEvent } from "../Events/PayeeRequestedEvent";
import { PayeeProjection } from "../Projections/PayeeProjection";

export class CreatePayeeService extends Handler<PayeeRequestedEvent> {
  public static Instance = new CreatePayeeService();
  constructor() {
    super(PayeeRequestedEvent);
  }
  public Process(event: PayeeRequestedEvent) {
    // Create PayeeProjection
    const payeeProjection = new PayeeProjection();
    payeeProjection.Description = event.Description;
    payeeProjection.PayeeName = event.PayeeName;
    payeeProjection.Type = event.Type;
    payeeProjection.Project();
    return payeeProjection;
  }
}

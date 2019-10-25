import { PayeeRequestedEvent } from "../../Events/PayeeRequestedEvent";
import { PayeeProjection } from "../../Projections/PayeeProjection";
import { Handler } from "../Core/Handler";

export class CreatePayeeService extends Handler<PayeeRequestedEvent> {
  public static Instance = new CreatePayeeService();
  private constructor() {
    super(PayeeRequestedEvent);
  }
  public Handle(event: PayeeRequestedEvent) {
    // Create PayeeProjection
    const payeeProjection = new PayeeProjection();
    payeeProjection.Description = event.Description;
    payeeProjection.PayeeName = event.PayeeName;
    payeeProjection.Type = event.Type;
    payeeProjection.Project();
    return payeeProjection;
  }
}
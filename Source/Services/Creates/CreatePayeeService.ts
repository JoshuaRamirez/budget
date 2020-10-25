import { PayeeRequestedEvent } from "../../Events/Requested/Creation/PayeeRequestedEvent";
import { PayeeProjection } from "../../Projections/PayeeProjection";
import { Receiver } from "../Core/Receiver";

export class CreatePayeeService extends Receiver<PayeeRequestedEvent> {
  public static Instance = new CreatePayeeService();
  private constructor() {
    super(PayeeRequestedEvent);
  }
  public async Receive(event: PayeeRequestedEvent): Promise<void> {
    // Create PayeeProjection
    const payeeProjection = new PayeeProjection();
    payeeProjection.Description = event.Description;
    payeeProjection.PayeeName = event.PayeeName;
    payeeProjection.Type = event.Type;
    await payeeProjection.Project();
    return new Promise((resolve, reject) => resolve());
  }
}

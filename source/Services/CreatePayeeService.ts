import { ISubscriber } from "../Core/ISubscriber";
import { Publisher } from "../Core/Publisher";
import { PayeeRequestedEvent } from "../Events/PayeeRequestedEvent";
import { PayeeProjection } from "../Projections/PayeeProjection";

export class CreatePayeeService implements ISubscriber<PayeeRequestedEvent> {
  public static Instance = new CreatePayeeService();
  public Process(event: PayeeRequestedEvent) {
    // Create PayeeProjection
    const payeeProjection = new PayeeProjection();
    payeeProjection.Description = event.Description;
    payeeProjection.PayeeName = event.PayeeName;
    payeeProjection.Type = event.Type;
    payeeProjection.Project();
    return payeeProjection;
  }
  public Subscribe() {
    Publisher.Instance.Subscribe(PayeeRequestedEvent, this);
  }
}

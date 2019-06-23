import { ISubscriber } from "../Core/ISubscriber";
import { Publisher } from "../Core/Publisher";
import { PayeeRequestedEvent } from "../Events/PayeeRequestedEvent";
import { PayeeProjection } from "../Projections/PayeeProjection";

export class CreatePayeeService implements ISubscriber<PayeeRequestedEvent> {
  public static Instance = new CreatePayeeService();
  private handles = [];
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
    const handle = Publisher.Instance.Subscribe(PayeeRequestedEvent, this);
    this.handles.push(handle);
  }
  public UnSubscribe() {
    this.handles.forEach((handle) => {
      Publisher.Instance.UnSubscribe(PayeeRequestedEvent, handle);
    });
  }
}

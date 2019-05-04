import { ISubscriber } from "../Core/ISubscriber";
import { ProjectionStore } from "../Core/ProjectionStore";
import { Publisher } from "../Core/Publisher";
import { PayeeRequestedEvent } from "../Events/PayeeRequestedEvent";
import { PayeeProjection } from "../Projections/PayeeProjection";

export class CreatePayeeService implements ISubscriber<PayeeRequestedEvent> {
  public static Instance = new CreatePayeeService();
  public Process(event: PayeeRequestedEvent) {
    // Create Expense Projection
    const payeeProjection = new PayeeProjection();
    payeeProjection.Description = event.Description;
    payeeProjection.Name = event.Name;
    payeeProjection.Type = event.Type;
    ProjectionStore.Instance.Project(payeeProjection);
    return payeeProjection;
  }
  public Subscribe() {
    Publisher.Instance.Subscribe(PayeeRequestedEvent, this);
  }
}
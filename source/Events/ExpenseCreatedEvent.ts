import { Event } from "../Core/Event";
import { Publisher } from "../Core/Publisher";

export class ExpenseCreatedEvent extends Event {
  public ExpenseId: any;
  constructor() {
    super(ExpenseCreatedEvent.name);
  }
  public Publish() {
    Publisher.Instance.Publish(this);
  }
}

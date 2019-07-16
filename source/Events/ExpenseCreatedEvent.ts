import { Event } from "../Core/Event";
import { Publisher } from "../Core/Publisher";
import { ExpenseProjection } from "../Projections/ExpenseProjection";

export class ExpenseCreatedEvent extends Event {
  public ExpenseProjection: ExpenseProjection; // TODO: Use ID instead.
  constructor() {
    super(ExpenseCreatedEvent.name);
  }
  public Publish() {
    Publisher.Instance.Publish(this);
  }
}

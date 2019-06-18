import { Event } from "../Core/Event";
import { Publisher } from "../Core/Publisher";

export class CategoryRequestedEvent extends Event {
  public CategoryName: string;
  public Type: string;
  constructor() {
    super(CategoryRequestedEvent.name);
  }
  public Publish() {
    Publisher.Instance.Publish(this);
  }
}

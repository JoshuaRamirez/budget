import { MainEvent } from "../Core/MainEvent";
import { Publisher } from "../Core/Publisher";

export class AllocationRequestedEvent extends MainEvent<AllocationRequestedEvent> {
  public Amount: number;
  public LedgerId: any;
  constructor() {
    super(AllocationRequestedEvent.name);
  }
  public Publish() {
    Publisher.Instance.Publish(this);
  }
}

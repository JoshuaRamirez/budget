import { MainEvent } from "../Core/MainEvent";

export class AllocationRequestedEvent extends MainEvent<AllocationRequestedEvent> {
  public Amount: number;
  public LedgerId: any;
  constructor() {
    super(AllocationRequestedEvent.name);
  }
}

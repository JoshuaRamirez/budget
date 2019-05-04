import { Saga } from "../Core/Saga";
import { AllocationRequestedEvent } from "../Events/AllocationRequestedEvent";

export class CreateAllocationSaga extends Saga {
  public Amount: number;
  public LedgerId: any;
  public TransactionId: any;
  constructor(allocationRequestedEvent: AllocationRequestedEvent) {
    super(CreateAllocationSaga.name);
    this.Amount = allocationRequestedEvent.Amount;
    this.LedgerId = allocationRequestedEvent.LedgerId;
  }
}

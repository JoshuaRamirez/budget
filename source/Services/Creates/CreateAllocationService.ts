import { Handler } from "../../Core/Handler";
import { AllocationRequestedEvent } from "../../Events/AllocationRequestedEvent";
import { AllocationProjection } from "../../Projections/AllocationProjection";

export class CreateAllocationService extends Handler<AllocationRequestedEvent> {
  public static Instance = new CreateAllocationService();
  private constructor() {
    super(AllocationRequestedEvent);
  }
  public Handle(event: AllocationRequestedEvent) {
    // Create Allocation Projection
    const allocationProjection: AllocationProjection = new AllocationProjection();
    allocationProjection.LedgerId = event.LedgerId;
    allocationProjection.TransactionId = event.TransactionId;
    allocationProjection.Project();
  }
}

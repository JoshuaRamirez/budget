import { AllocationRequestedEvent } from "../../Events/Requested/Creation/AllocationRequestedEvent";
import { AllocationProjection } from "../../Projections/AllocationProjection";
import { Receiver } from "../Core/Receiver";

export class CreateAllocationService extends Receiver<AllocationRequestedEvent> {
  public static Instance = new CreateAllocationService();
  private constructor() {
    super(AllocationRequestedEvent);
  }
  public Receive(event: AllocationRequestedEvent) {
    // Create Allocation Projection
    const allocationProjection: AllocationProjection = new AllocationProjection();
    allocationProjection.LedgerId = event.LedgerId;
    allocationProjection.TransactionId = event.TransactionId;
    allocationProjection.Project();
  }
}

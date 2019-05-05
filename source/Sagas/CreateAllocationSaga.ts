import { Saga } from "../Core/Saga";
import { SagaStore } from "../Core/SagaStore";
import { AllocationRequestedEvent } from "../Events/AllocationRequestedEvent";

export class CreateAllocationSaga extends Saga {
  public static Get(sagaId: any): CreateAllocationSaga {
    return SagaStore.Instance.GetSaga<CreateAllocationSaga>(sagaId);
  }
  public Amount: number;
  public LedgerId: any;
  public TransactionId: any;
  constructor(allocationRequestedEvent: AllocationRequestedEvent) {
    super(CreateAllocationSaga.name);
    this.Amount = allocationRequestedEvent.Amount;
    this.LedgerId = allocationRequestedEvent.LedgerId;
  }
}


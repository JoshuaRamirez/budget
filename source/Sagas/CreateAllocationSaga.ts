import { Saga } from "../Core/Saga";

export class CreateAllocationSaga extends Saga {
  public Amount: number;
  public LedgerId: any;
  public TransactionId: any;
}

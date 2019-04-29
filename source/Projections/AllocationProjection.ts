import { Projection } from "../Core/Projection";

export class AllocationProjection extends Projection {
  public Amount: number;
  public Id: any;
  public LedgerId: any;
  public TransactionId: any;
  constructor() {
    super(AllocationProjection.name);
  }
}

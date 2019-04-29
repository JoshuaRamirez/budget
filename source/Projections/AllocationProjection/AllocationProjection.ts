import { IProjection } from "../../Core/IProjection";

export class AllocationProjection implements IProjection {
  public Amount: number;
  public Id: any;
  public LedgerId: any;
  public TransactionId: any;
}

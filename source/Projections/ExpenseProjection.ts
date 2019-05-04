import { Projection } from "../Core/Projection";

export class ExpenseProjection extends Projection {
  public Amount: number;
  public Description: string;
  public LedgerId: any;
  public TransactionId: any;
  public PayeeId: any;
  public Category: string;
  constructor() {
    super(ExpenseProjection.name);
  }
}

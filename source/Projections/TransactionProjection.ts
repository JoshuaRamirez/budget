import { Projection } from "../Core/Projection";

export class TransactionProjection extends Projection {
  public Amount: number;
  public Destination: any;
  public LedgerId: any;
  public Source: any;
  public Type: string;
  constructor() {
    super(TransactionProjection.name);
  }
}

import { Projection } from "../Core/Projection";

export class LedgerProjection extends Projection {
  public Account: any;
  public Balance: number;
  public TransactionIds: any[];
  public Type: string;
  constructor() {
    super(LedgerProjection.name);
  }
}

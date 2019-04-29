import { Projection } from "../Core/Projection";
import { TransactionProjection } from "./TransactionProjection";

export class LedgerProjection extends Projection {
  public Account: any;
  public Balance: number;
  public Id: any;
  public Transactions: TransactionProjection[];
  public Type: string;
  constructor() {
    super(LedgerProjection.name);
  }
}

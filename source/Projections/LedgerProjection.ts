import { IProjection } from "../Core/IProjection";

export class LedgerProjection implements IProjection {
  public Account: any;
  public Balance: number;
  public Id: any;
  public Transactions: any[];
  public Type: string;
}

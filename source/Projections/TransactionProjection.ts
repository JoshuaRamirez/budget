import { IProjection } from "../Core/IProjection";

export class TransactionProjection implements IProjection {
  public Id: any;
  public Amount: number;
  public Destination: any;
  public LedgerId: any;
  public Source: any;
  public Type: string;
}

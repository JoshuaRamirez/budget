import { Projection } from "../Core/Projection";

export class PayeeProjection extends Projection {
  public Description: string;
  public ExpenseIds: any[];
  public Name: string;
  public Type: string;
  constructor() {
    super(PayeeProjection.name);
    this.ExpenseIds = [];
  }
}

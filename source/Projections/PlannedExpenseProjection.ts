import { Projection } from "../Core/Projection";

export class PlannedExpenseProjection extends Projection {
  public Description: string;
  public ExpenseIds: any[] = [];
  public Name: string;
  public RepeatPeriod: number;
  public RepeatMeasurement: string;
  public RepeatCount: number;
  public RepeatStart: Date;
  constructor() {
    super(PlannedExpenseProjection.name);
  }
}

import { Projection } from "../Core/Projection";
import { ProjectionStore } from "../Core/ProjectionStore";

export class PlannedExpenseProjection extends Projection {
  public static Get(id: any): PlannedExpenseProjection {
    return ProjectionStore.Instance.GetProjection(PlannedExpenseProjection, id);
  }
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

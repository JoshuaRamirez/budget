import { date, list, primitive, serializable } from "serializr";
import { IPlannedTransaction } from "../Core/PlannedTransaction";
import { Projection } from "../Core/Projection";
import { ProjectionStore } from "../Core/ProjectionStore";

export class PlannedExpenseProjection extends Projection implements IPlannedTransaction {
  public static Get(id: any): PlannedExpenseProjection {
    return ProjectionStore.Instance.GetProjection(PlannedExpenseProjection, id);
  }
  public static All(): PlannedExpenseProjection[] {
    return ProjectionStore.Instance.GetProjections(PlannedExpenseProjection);
  }
  @serializable public Amount: number;
  @serializable public Description: string;
  @serializable(list(primitive())) public ExpenseIds: any[];
  @serializable(list(primitive())) public ForecastIds: any[];
  @serializable public RepeatPeriod: number;
  @serializable public RepeatMeasurement: string;
  @serializable public RepeatCount: number;
  @serializable(date()) public RepeatStart: Date;
  constructor() {
    super(PlannedExpenseProjection.name);
    this.ExpenseIds = [];
  }
  public Project(): void {
    ProjectionStore.Instance.Save(this);
  }
  public Update(): void {
    ProjectionStore.Instance.Update(PlannedExpenseProjection, this);
  }
}

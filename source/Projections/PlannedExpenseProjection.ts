import { list, primitive, serializable } from "serializr";
import { Projection } from "../Core/Projection";
import { ProjectionStore } from "../Core/ProjectionStore";

export class PlannedExpenseProjection extends Projection {
  public static Get(id: any): PlannedExpenseProjection {
    return ProjectionStore.Instance.GetProjection(PlannedExpenseProjection, id);
  }
  @serializable public Description: string;
  @serializable(list(primitive())) public ExpenseIds: any[];
  @serializable public RepeatPeriod: number;
  @serializable public RepeatMeasurement: string;
  @serializable public RepeatCount: number;
  @serializable public RepeatStart: Date;
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

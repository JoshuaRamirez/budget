import { date, list, primitive, serializable } from "serializr";
import { IPlannedTransaction } from "./Core/IPlannedTransaction";
import { Projection } from "./Core/Projection";
import { ProjectionStore } from "./Core/ProjectionStore";

export class PlannedExpenseProjection extends Projection implements IPlannedTransaction {
  public static async Get(id: any): Promise<PlannedExpenseProjection> {
    const projection = await ProjectionStore.Instance.GetProjection<PlannedExpenseProjection>(PlannedExpenseProjection, id);
    return new Promise((resolve, reject) => resolve(projection));
  }
  public static async All(): Promise<PlannedExpenseProjection[]> {
    const projection = await ProjectionStore.Instance.GetProjections<PlannedExpenseProjection>(PlannedExpenseProjection);
    return new Promise((resolve, reject) => resolve(projection));
  }

  // Foreign Keys
  @serializable(list(primitive())) public ExpenseIds: any[] = [];
  @serializable(list(primitive())) public ForecastIds: any[] = [];

  // Fields
  @serializable public Amount: number;
  @serializable public Description: string;
  @serializable public RepeatPeriod: number;
  @serializable public RepeatMeasurement: string;
  @serializable public RepeatCount: number;
  @serializable(date()) public StartDate: Date;

  constructor() {
    super(PlannedExpenseProjection.name);
    this.ExpenseIds = [];
  }
  public async Project(): Promise<void> {
    await ProjectionStore.Instance.Save(this);
    return new Promise((resolve, reject) => resolve());
  }
  public async Update(): Promise<void> {
    await ProjectionStore.Instance.Update(PlannedExpenseProjection, this);
    return new Promise((resolve, reject) => resolve());
  }
}

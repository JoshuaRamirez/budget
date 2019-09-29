import { date, list, primitive, serializable } from "serializr";
import { Projection } from "../Core/Projection";
import { ProjectionStore } from "../Core/ProjectionStore";

export class ForecastProjection extends Projection {
  public static All(): ForecastProjection[] {
    return ProjectionStore.Instance.GetProjections(ForecastProjection);
  }
  public static Get(id: any): ForecastProjection {
    return ProjectionStore.Instance.GetProjection(ForecastProjection, id);
  }
  public static Last(): ForecastProjection {
    const result = ProjectionStore.Instance.GetProjections(ForecastProjection);
    return result[result.length - 1];
  }

  // Foreign Keys
  @serializable public AccountId: any = undefined;
  @serializable public CategoryId: any = undefined;
  @serializable(list(primitive())) public PlannedDepositIds: any[] = [];
  @serializable(list(primitive())) public PlannedExpenseIds: any[] = [];
  @serializable(list(primitive())) public PlannedForecastIds: any[] = [];

  // Fields
  @serializable public Amount: number = undefined;
  @serializable(date()) public Date: Date = undefined;
  @serializable public Notes: string = undefined;

  constructor() {
    super(ForecastProjection.name);
  }
  public Project(): void {
    ProjectionStore.Instance.Save(this);
  }
  public Update(): void {
    ProjectionStore.Instance.Update(ForecastProjection, this);
  }
}

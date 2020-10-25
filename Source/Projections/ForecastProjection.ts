import { date, list, primitive, serializable } from "serializr";
import { Projection } from "./Core/Projection";
import { ProjectionStore } from "./Core/ProjectionStore";

export class ForecastProjection extends Projection {
  public static async All(): Promise<ForecastProjection[]> {
    const projections = await ProjectionStore.Instance.GetProjections<ForecastProjection>(ForecastProjection);
    return new Promise((resolve, reject) => resolve(projections));
  }
  public static async Get(id: any): Promise<ForecastProjection> {
    const projection = await ProjectionStore.Instance.GetProjection<ForecastProjection>(ForecastProjection, id);
    return new Promise((resolve, reject) => resolve(projection));
  }
  public static async Last(): Promise<ForecastProjection> {
    // TODO: Convert below to use a Length method on the ProjectionStore
    const projections = await ProjectionStore.Instance.GetProjections<ForecastProjection>(ForecastProjection);
    const projection = projections[projections.length - 1];
    return new Promise((resolve, reject) => resolve(projection));
  }

  // Foreign Keys
  @serializable public AccountId: any = undefined;
  @serializable public CategoryId: any = undefined;
  @serializable(list(primitive())) public PlannedDepositIds: any[] = [];
  @serializable(list(primitive())) public PlannedExpenseIds: any[] = [];

  // Fields
  @serializable public Amount: number = undefined;
  @serializable(date()) public Date: Date = undefined;
  @serializable public Notes: string = undefined;

  constructor() {
    super(ForecastProjection.name);
  }
  public async Project(): Promise<void> {
    ProjectionStore.Instance.Save(this);
    return new Promise((resolve, reject) => resolve());
  }
  public async Update(): Promise<void> {
    ProjectionStore.Instance.Update(ForecastProjection, this);
    return new Promise((resolve, reject) => resolve());
  }
}

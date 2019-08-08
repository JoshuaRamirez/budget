import { serializable } from "serializr";
import { Projection } from "../Core/Projection";
import { ProjectionStore } from "../Core/ProjectionStore";

export class ForecastProjection extends Projection {
  public static Get(id: any): ForecastProjection {
    return ProjectionStore.Instance.GetProjection(ForecastProjection, id);
  }
  @serializable public Amount: number;
  @serializable public AccountId: any;
  @serializable public CategoryId: any;
  @serializable public Date: Date;
  @serializable public PlannedDepositId: any;
  @serializable public PlannedForecastId: any;
  @serializable public Notes: string;
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

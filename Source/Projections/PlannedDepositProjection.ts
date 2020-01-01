import { date, list, primitive, serializable } from "serializr";
import { IPlannedTransaction } from "./Core/IPlannedTransaction";
import { Projection } from "./Core/Projection";
import { ProjectionStore } from "./Core/ProjectionStore";

export class PlannedDepositProjection extends Projection implements IPlannedTransaction {
  public static All(): PlannedDepositProjection[] {
    return ProjectionStore.Instance.GetProjections(PlannedDepositProjection);
  }
  public static Get(id: any): PlannedDepositProjection {
    return ProjectionStore.Instance.GetProjection(PlannedDepositProjection, id);
  }

  // Foreign Keys
  @serializable(list(primitive())) public DepositIds: any[] = [];
  @serializable(list(primitive())) public ForecastIds: any[] = [];

  // Fields
  @serializable public Amount: number;
  @serializable public Description: string;
  @serializable public RepeatPeriod: number;
  @serializable public RepeatMeasurement: string;
  @serializable public RepeatCount: number;
  @serializable(date()) public StartDate: Date;

  constructor() {
    super(PlannedDepositProjection.name);
    this.DepositIds = [];
  }
  public Project(): void {
    ProjectionStore.Instance.Save(this);
  }
  public Update(): void {
    ProjectionStore.Instance.Update(PlannedDepositProjection, this);
  }
}

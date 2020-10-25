import { date, list, primitive, serializable } from "serializr";
import { IPlannedTransaction } from "./Core/IPlannedTransaction";
import { Projection } from "./Core/Projection";
import { ProjectionStore } from "./Core/ProjectionStore";

export class PlannedDepositProjection extends Projection implements IPlannedTransaction {
  public static async All(): Promise<PlannedDepositProjection[]> {
    const projection = await ProjectionStore.Instance.GetProjections<PlannedDepositProjection>(PlannedDepositProjection);
    return new Promise((resolve, reject) => resolve(projection));
  }
  public static async Get(id: any): Promise<PlannedDepositProjection> {
    const projection = await ProjectionStore.Instance.GetProjection<PlannedDepositProjection>(PlannedDepositProjection, id);
    return new Promise((resolve, reject) => resolve(projection));
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
  public async Project(): Promise<void> {
    await ProjectionStore.Instance.Save(this);
    return new Promise((resolve, reject) => resolve());
  }
  public async Update(): Promise<void> {
    await ProjectionStore.Instance.Update(PlannedDepositProjection, this);
    return new Promise((resolve, reject) => resolve());
  }
}

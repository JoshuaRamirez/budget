import { list, primitive, serializable } from "serializr";
import { Projection } from "../Core/Projection";
import { ProjectionStore } from "../Core/ProjectionStore";

export class PlannedDepositProjection extends Projection {
  public static Get(id: any): PlannedDepositProjection {
    return ProjectionStore.Instance.GetProjection(PlannedDepositProjection, id);
  }
  @serializable public Amount: number;
  @serializable public Description: string;
  @serializable(list(primitive())) public DepositIds: any[];
  @serializable public RepeatPeriod: number;
  @serializable public RepeatMeasurement: string;
  @serializable public RepeatCount: number;
  @serializable public RepeatStart: Date;
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

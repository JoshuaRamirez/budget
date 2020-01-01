import { date, list, primitive, serializable } from "serializr";
import { IPlannedTransaction } from "./Core/IPlannedTransaction";
import { Projection } from "./Core/Projection";
import { ProjectionStore } from "./Core/ProjectionStore";

export class PlannedTransactionProjection extends Projection implements IPlannedTransaction {
  public static Get(id: any): PlannedTransactionProjection {
    return ProjectionStore.Instance.GetProjection(PlannedTransactionProjection, id);
  }
  public static All(): PlannedTransactionProjection[] {
    return ProjectionStore.Instance.GetProjections(PlannedTransactionProjection);
  }
  public static Last(): PlannedTransactionProjection {
    const result = ProjectionStore.Instance.GetProjections<PlannedTransactionProjection>(PlannedTransactionProjection);
    return result[result.length - 1];
  }

  // Fields
  @serializable public Amount: number;
  @serializable public Description: string;
  @serializable(date()) public Date: Date;
  @serializable public RepeatPeriod: number;
  @serializable public RepeatMeasurement: string;
  @serializable public RepeatCount: number;
  @serializable(list(primitive())) public ProposedTransactionIds: any[] = [];
  // TODO: Increment the below when creating new transactions (proposed or real or both)
  @serializable public TimesRepeated: number;
  @serializable(date()) public StartDate: Date;
  @serializable public TransactionType: string;

  constructor() {
    super(PlannedTransactionProjection.name);
  }
  public Project(): void {
    ProjectionStore.Instance.Save(this);
  }
  public Update(): void {
    ProjectionStore.Instance.Update(PlannedTransactionProjection, this);
  }
}

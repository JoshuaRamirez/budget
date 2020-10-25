import { date, list, primitive, serializable } from "serializr";
import { IPlannedTransaction } from "./Core/IPlannedTransaction";
import { Projection } from "./Core/Projection";
import { ProjectionStore } from "./Core/ProjectionStore";

export class PlannedTransactionProjection extends Projection implements IPlannedTransaction {
  public static async Get(id: any): Promise<PlannedTransactionProjection> {
    const projection = await ProjectionStore.Instance.GetProjection<PlannedTransactionProjection>(PlannedTransactionProjection, id);
    return new Promise((resolve, reject) => resolve(projection));
  }
  public static async All(): Promise<PlannedTransactionProjection[]> {
    const projection = await ProjectionStore.Instance.GetProjections<PlannedTransactionProjection>(PlannedTransactionProjection);
    return new Promise((resolve, reject) => resolve(projection));
  }
  public static async Last(): Promise<PlannedTransactionProjection> {
    const projections = await ProjectionStore.Instance.GetProjections<PlannedTransactionProjection>(PlannedTransactionProjection);
    const projection = projections[projections.length - 1];
    return new Promise((resolve, reject) => resolve(projection));
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
  public async Project(): Promise<void> {
    await ProjectionStore.Instance.Save(this);
    return new Promise((resolve, reject) => resolve());
  }
  public async Update(): Promise<void> {
    await ProjectionStore.Instance.Update(PlannedTransactionProjection, this);
    return new Promise((resolve, reject) => resolve());
  }
}

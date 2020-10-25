import { list, primitive, serializable } from "serializr";
import { Projection } from "./Core/Projection";
import { ProjectionStore } from "./Core/ProjectionStore";

export class BudgetProjection extends Projection {
  public static async Get(id: any): Promise<BudgetProjection> {
    const projection: BudgetProjection = await ProjectionStore.Instance.GetProjection<BudgetProjection>(BudgetProjection, id);
    return new Promise((resolve, reject) => resolve(projection));
  }

  // Foreign Keys
  @serializable(list(primitive())) public DepositIds: any[] = [];
  @serializable(list(primitive())) public ExpenseIds: any[] = [];
  @serializable(list(primitive())) public SubBudgetIds: any[] = [];
  @serializable(list(primitive())) public SuperBudgetIds: any[] = [];

  // Properties
  @serializable public BudgetName: string;
  @serializable public IsRepeating: boolean;
  @serializable public PeriodInDays: number;
  @serializable public Remaining: number;
  @serializable public StartDate: Date;
  @serializable public Type: string;

  constructor() {
    super(BudgetProjection.name);
  }
  public async Project(): Promise<void> {
    await ProjectionStore.Instance.Save(this);
    return new Promise((resolve, reject) => resolve());
  }
  public async Update(): Promise<void> {
    await ProjectionStore.Instance.Update(BudgetProjection, this);
    return new Promise((resolve, reject) => resolve());
  }
}

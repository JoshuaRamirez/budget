import { list, primitive, serializable } from "serializr";
import { Projection } from "./Core/Projection";
import { ProjectionStore } from "./Core/ProjectionStore";

export class BudgetProjection extends Projection {
  public static Get(id: any): BudgetProjection {
    return ProjectionStore.Instance.GetProjection(BudgetProjection, id);
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
  public Project(): void {
    ProjectionStore.Instance.Save(this);
  }
  public Update(): void {
    ProjectionStore.Instance.Update(BudgetProjection, this);
  }
}

import { list, primitive, serializable } from "serializr";
import { Projection } from "../Core/Projection";
import { ProjectionStore } from "../Core/ProjectionStore";

export class UserProjection extends Projection {
  public static Get(id: any): UserProjection {
    return ProjectionStore.Instance.GetProjection(UserProjection, id);
  }
  @serializable public UserName: string;
  @serializable public Password: string;
  @serializable public FirstName: string;
  @serializable public LastName: string;
  @serializable public Email: string;
  @serializable public Type: string;
  @serializable(list(primitive())) public AccountIds: any[] = [];
  @serializable(list(primitive())) public CategoryIds: any[] = [];
  @serializable(list(primitive())) public IncomeAccountId: any = [];
  @serializable(list(primitive())) public PayeeIds: any[] = [];
  constructor() {
    super(UserProjection.name);
  }
  public Project(): void {
    ProjectionStore.Instance.Save(this);
  }
  public Update(): void {
    ProjectionStore.Instance.Update(UserProjection, this);
  }
}

import { list, primitive, serializable } from "serializr";
import { Projection } from "./Core/Projection";
import { ProjectionStore } from "./Core/ProjectionStore";

export class UserProjection extends Projection {
  public static async Get(id: any): Promise<UserProjection> {
    const projection = await ProjectionStore.Instance.GetProjection<UserProjection>(UserProjection, id);
    return new Promise((resolve, reject) => resolve(projection));
  }

  // Foreign Keys
  @serializable(list(primitive())) public AccountIds: any[] = [];
  @serializable(list(primitive())) public CategoryIds: any[] = [];
  @serializable(list(primitive())) public IncomeAccountId: any = [];
  @serializable(list(primitive())) public PayeeIds: any[] = [];

  // Fields
  @serializable public Email: string;
  @serializable public FirstName: string;
  @serializable public LastName: string;
  @serializable public Password: string;
  @serializable public UserName: string;
  @serializable public Type: string;

  constructor() {
    super(UserProjection.name);
  }
  public async Project(): Promise<void> {
    await ProjectionStore.Instance.Save(this);
    return new Promise((resolve, reject) => resolve());
  }
  public async Update(): Promise<void> {
    await ProjectionStore.Instance.Update(UserProjection, this);
    return new Promise((resolve, reject) => resolve());
  }
}

import { ISubscriber } from "../Core/ISubscriber";
import { Publisher } from "../Core/Publisher";
import { CategoryRequestedEvent } from "../Events/CategoryRequestedEvent";
import { CategoryProjection } from "../Projections/CategoryProjection";

export class CreateCategoryService implements ISubscriber<CategoryRequestedEvent> {
  public static Instance = new CreateCategoryService();
  private handles = [];
  public Process(event: CategoryRequestedEvent) {
    const accountProjection = new CategoryProjection();
    accountProjection.CategoryName = event.CategoryName;
    accountProjection.Type = event.Type;
    accountProjection.Project();
  }
  public Subscribe() {
    const handle = Publisher.Instance.Subscribe(CategoryRequestedEvent, this);
    this.handles.push(handle);
  }
  public UnSubscribe() {
    this.handles.forEach((handle) => {
      Publisher.Instance.UnSubscribe(CategoryRequestedEvent, handle);
    });
  }
}

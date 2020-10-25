import { CategoryRequestedEvent } from "../../Events/Requested/Creation/CategoryRequestedEvent";
import { CategoryProjection } from "../../Projections/CategoryProjection";
import { Receiver } from "../Core/Receiver";

export class CreateCategoryService extends Receiver<CategoryRequestedEvent> {
  public static Instance = new CreateCategoryService();
  private constructor() {
    super(CategoryRequestedEvent);
  }
  public async Receive(event: CategoryRequestedEvent): Promise<void> {
    const accountProjection = new CategoryProjection();
    accountProjection.CategoryName = event.CategoryName;
    accountProjection.Type = event.Type;
    await accountProjection.Project();
    return new Promise((resolve, reject) => resolve());
  }
}

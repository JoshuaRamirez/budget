import { Id } from "./Id";

export abstract class Saga {
  public Id: any = Id.Generate();
}

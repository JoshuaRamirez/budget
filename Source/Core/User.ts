import { Id } from "../Projections/Core/Id";

export class User {
  // TODO: Consider simulating multi-tenancy
  public static Id: any = Id.Generate();
}

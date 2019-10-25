import { Id } from "../Projections/Core/Id";

export class User {
  // TODO: Consider simulating multi-tenancy
  public static Id: any = Id.Generate();
  public static GetDate() {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return today;
  }
  public static GetDateTime() {
    return new Date();
  }
}

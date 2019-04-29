import { Projection } from "../Core/Projection";

export class AccountProjection extends Projection {
  public Name: string;
  public Type: string;
  constructor() {
    super(AccountProjection.name);
  }
}

import { Projection } from "../Core/Projection";

export class AccountProjection extends Projection {
  public Id: number;
  public Name: string;
  public Type: string;
  constructor() {
    super(AccountProjection.name);
  }
}

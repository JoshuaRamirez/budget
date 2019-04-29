import { IProjection } from "../Core/IProjection";

export class AccountProjection implements IProjection {
  public Id: number;
  public Name: string;
  public Type: string;
}

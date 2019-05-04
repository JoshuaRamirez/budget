import { Id } from "./Id";

export abstract class Saga {
  public Id: any;
  public Name: string;
  public constructor(sagaName: string) {
    this.Name = sagaName;
    this.Id = Id.Generate();
  }
}

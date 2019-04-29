import { MainEvent } from "../Core/MainEvent";

export class LedgerRequestedEvent extends MainEvent<LedgerRequestedEvent> {
  public Account: any;
  public Name: string;
  public Type: string;
  constructor() {
    super(LedgerRequestedEvent.name);
  }
}

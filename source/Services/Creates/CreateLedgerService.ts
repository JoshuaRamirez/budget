import { Handler } from "../../Core/Handler";
import { LedgerCreatedEvent } from "../../Events/LedgerCreatedEvent";
import { LedgerRequestedEvent } from "../../Events/LedgerRequestedEvent";
import { LedgerProjection } from "../../Projections/LedgerProjection";

export class CreateLedgerService extends Handler<LedgerRequestedEvent> {
  public static Instance = new CreateLedgerService();
  private constructor() {
    super(LedgerRequestedEvent);
  }
  public Handle(event: LedgerRequestedEvent) {
    // Create LedgerProjection
    const ledgerProjection = new LedgerProjection();
    ledgerProjection.AccountId = event.AccountId;
    ledgerProjection.Balance = 0;
    ledgerProjection.TransactionIds = [];
    ledgerProjection.Type = event.Type;
    ledgerProjection.Project();
    // Publish LedgerCreatedEvent
    const ledgerCreated = new LedgerCreatedEvent();
    ledgerCreated.LedgerId = ledgerProjection.Id;
    ledgerCreated.Publish();
  }
}

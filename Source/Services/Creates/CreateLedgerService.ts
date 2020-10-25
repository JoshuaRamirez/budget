import { LedgerCreatedEvent } from "../../Events/Created/LedgerCreatedEvent";
import { LedgerRequestedEvent } from "../../Events/Requested/Creation/LedgerRequestedEvent";
import { LedgerProjection } from "../../Projections/LedgerProjection";
import { Receiver } from "../Core/Receiver";

export class CreateLedgerService extends Receiver<LedgerRequestedEvent> {
  public static Instance = new CreateLedgerService();
  private constructor() {
    super(LedgerRequestedEvent);
  }
  public async Receive(event: LedgerRequestedEvent): Promise<void> {
    // Create LedgerProjection
    const ledgerProjection = new LedgerProjection();
    ledgerProjection.AccountId = event.AccountId;
    ledgerProjection.Balance = 0;
    ledgerProjection.TransactionIds = [];
    ledgerProjection.Type = event.Type;
    await ledgerProjection.Project();
    // Publish LedgerCreatedEvent
    const ledgerCreated = new LedgerCreatedEvent();
    ledgerCreated.LedgerId = ledgerProjection.Id;
    await ledgerCreated.Publish();
    return new Promise((resolve, reject) => resolve());
  }
}

import { ProposedTransactionCreatedEvent } from "../../Events/Created/ProposedTransactionCreatedEvent";
import { ProposedTransactionRequestedEvent } from "../../Events/Requested/Creation/ProposedTransactionRequestedEvent";
import { ProposedTransactionProjection } from "../../Projections/ProposedTransactionProjection";
import { Receiver } from "../Core/Receiver";

export class CreateProposedTransactionService extends Receiver<ProposedTransactionRequestedEvent> {
  public static Instance = new CreateProposedTransactionService();
  private constructor() {
    super(ProposedTransactionRequestedEvent);
  }
  public async Receive(event: ProposedTransactionRequestedEvent): Promise<void> {
    // Create ProposedTransactionProjection
    const proposedTransactionProjection = new ProposedTransactionProjection();
    proposedTransactionProjection.Amount = event.Amount;
    proposedTransactionProjection.Description = event.Description;
    proposedTransactionProjection.PlannedTransactionId = event.PlannedTransactionId;
    proposedTransactionProjection.TransactionType = event.TransactionType;
    await proposedTransactionProjection.Project();
    // Publish ProposedTransactionCreatedEvent
    const proposedTransactionCreatedEvent = new ProposedTransactionCreatedEvent();
    proposedTransactionCreatedEvent.ProposedTransactionId = proposedTransactionProjection.Id;
    await proposedTransactionCreatedEvent.Publish();
    return new Promise((resolve, reject) => resolve());
  }
}

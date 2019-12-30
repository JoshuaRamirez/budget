import { ProposedTransactionCreatedEvent } from "../../Events/ProposedTransactionCreatedEvent";
import { ProposedTransactionCreationRequestedEvent } from "../../Events/ProposedTransactionCreationRequestedEvent";
import { ProposedTransactionProjection } from "../../Projections/ProposedTransactionProjection";
import { Handler } from "../Core/Handler";

export class CreateProposedTransactionService extends Handler<ProposedTransactionCreationRequestedEvent>  {
  public static Instance = new CreateProposedTransactionService();
  private constructor() {
    super(ProposedTransactionCreationRequestedEvent);
  }
  public Handle(event: ProposedTransactionCreationRequestedEvent) {
    // Create ProposedTransactionProjection
    const proposedTransactionProjection = new ProposedTransactionProjection();
    proposedTransactionProjection.Amount = event.Amount;
    proposedTransactionProjection.Description = event.Description;
    proposedTransactionProjection.PlannedTransactionId = event.PlannedTransactionId;
    proposedTransactionProjection.TransactionType = event.TransactionType;
    proposedTransactionProjection.Project();
    // Publish ProposedTransactionCreatedEvent
    const proposedTransactionCreatedEvent = new ProposedTransactionCreatedEvent();
    proposedTransactionCreatedEvent.PlannedTransactionId = proposedTransactionProjection.PlannedTransactionId;
    proposedTransactionCreatedEvent.ProposedTransactionId = proposedTransactionProjection.Id;
    proposedTransactionCreatedEvent.Publish();
  }
}

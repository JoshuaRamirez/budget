import { ProposedTransactionCreatedEvent } from "../../Events/Created/ProposedTransactionCreatedEvent";
import { ProposedTransactionCreationRequestedEvent } from "../../Events/Requested/Creation/ProposedTransactionCreationRequestedEvent";
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
    proposedTransactionCreatedEvent.ProposedTransactionId = proposedTransactionProjection.Id;
    proposedTransactionCreatedEvent.Publish();
  }
}

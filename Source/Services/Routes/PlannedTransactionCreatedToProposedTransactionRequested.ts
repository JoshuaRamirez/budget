import { PlannedTransactionCreatedEvent } from "../../Events/Created/PlannedTransactionCreatedEvent";
import { ProposedTransactionRequestedEvent } from "../../Events/Requested/Creation/ProposedTransactionRequestedEvent";
import { Route } from "../Core/Route";
import { Router } from "../Core/Router";
import { ConvertPlannedTransactionCreatedToProposedTransactionCreationRequested } from "./Core/Conversions";

export class PlannedTransactionCreatedToProposedTransactionRequested extends Route<PlannedTransactionCreatedEvent, ProposedTransactionRequestedEvent> {
  public static Instance = new PlannedTransactionCreatedToProposedTransactionRequested();
  constructor() {
    super(PlannedTransactionCreatedEvent, ConvertPlannedTransactionCreatedToProposedTransactionCreationRequested);
    Router.Instance.Link(this);
  }
}

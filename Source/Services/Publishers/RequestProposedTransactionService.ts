import { User } from "../../Core/User";
import { PlannedTransactionCreatedEvent } from "../../Events/Created/PlannedTransactionCreatedEvent";
import { ProposedTransactionRequestedEvent } from "../../Events/Requested/Creation/ProposedTransactionRequestedEvent";
import { PlannedTransactionProjection } from "../../Projections/PlannedTransactionProjection";
import { Route } from "../Core/Route";
import { Router } from "../Core/Router";

export class RequestProposedTransactionService extends Router {
  public static Instance = new RequestProposedTransactionService();
  public static processNewDay() {
    const plannedTransactionProjections = PlannedTransactionProjection.All();
    plannedTransactionProjections.forEach((plannedTransactionProjection) => {
      const proposedTransactionCreationRequestedEvent = RequestProposedTransactionService.makeNewProposedTransactionCreationRequestedEventConditionally(plannedTransactionProjection);
      if (proposedTransactionCreationRequestedEvent) {
        proposedTransactionCreationRequestedEvent.Publish();
      }
    });
  }
  private static makeNewProposedTransactionCreationRequestedEventConditionally(plannedTransactionProjection: PlannedTransactionProjection) {
    const today = User.GetDate();
    // TODO: It appears that the projection should keep a counter of how many times it's been repeated. That way I can do the below:
    if (plannedTransactionProjection.RepeatCount >= plannedTransactionProjection.TimesRepeated) { return; }
    if (plannedTransactionProjection.StartDate > today) { return; }
    const proposedTransactionCreationRequestedEvent = new ProposedTransactionRequestedEvent();
    proposedTransactionCreationRequestedEvent.Amount = plannedTransactionProjection.Amount;
    proposedTransactionCreationRequestedEvent.Description = plannedTransactionProjection.Description;
    proposedTransactionCreationRequestedEvent.PlannedTransactionId = plannedTransactionProjection.Id;
    if (plannedTransactionProjection.ProposedTransactionIds.length === 0) {
      proposedTransactionCreationRequestedEvent.Date = plannedTransactionProjection.StartDate;
    }
    if (plannedTransactionProjection.ProposedTransactionIds.length > 0) {
      const lastProposedTransaction = PlannedTransactionProjection.Last();
      const nextDate = lastProposedTransaction.Date;
      nextDate.setDate(nextDate.getDate() + plannedTransactionProjection.RepeatPeriod);
      proposedTransactionCreationRequestedEvent.Date = nextDate;
    }
    return proposedTransactionCreationRequestedEvent;
  }
  private static processTransactionCreatedEvent(event: PlannedTransactionCreatedEvent) {
    const plannedTransactionProjection = PlannedTransactionProjection.Get(event.PlannedTransactionId);
    const proposedTransactionCreationRequestedEvent = RequestProposedTransactionService.makeNewProposedTransactionCreationRequestedEventConditionally(plannedTransactionProjection);
    return proposedTransactionCreationRequestedEvent;
  }
  constructor() {
    super();
    const route = new Route(PlannedTransactionCreatedEvent, RequestProposedTransactionService.processTransactionCreatedEvent);
    this.Link(route);
    RequestProposedTransactionService.processNewDay();
    this.startTimer();
  }
  private startTimer() {
    const tomorrow = User.GetDate();
    tomorrow.setDate(tomorrow.getDate() + 1);
    // @ts-ignore
    const difference = Math.abs(new Date() - tomorrow);
    setTimeout(this.repeatDaily, difference);
  }
  private repeatDaily() {
    RequestProposedTransactionService.processNewDay();
    const oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
    setInterval(RequestProposedTransactionService.processNewDay, oneDay);
  }
}

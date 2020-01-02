import { User } from "../../Core/User";
import { PlannedTransactionCreatedEvent } from "../../Events/PlannedTransactionCreatedEvent";
import { ProposedTransactionCreationRequestedEvent } from "../../Events/ProposedTransactionCreationRequestedEvent";
import { PlannedTransactionProjection } from "../../Projections/PlannedTransactionProjection";
import { Continuation } from "../Core/Continuation";
import { ContinuationHandler } from "../Core/ContinuationHandler";

export class PublishProposedTransactionCreationRequestedService extends Continuation {
  public static Instance = new PublishProposedTransactionCreationRequestedService();
  public static processNewDay() {
    const plannedTransactionProjections = PlannedTransactionProjection.All();
    plannedTransactionProjections.forEach((plannedTransactionProjection) => {
      const proposedTransactionCreationRequestedEvent = PublishProposedTransactionCreationRequestedService.makeNewProposedTransactionCreationRequestedEventConditionally(plannedTransactionProjection);
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
    const proposedTransactionCreationRequestedEvent = new ProposedTransactionCreationRequestedEvent();
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
    const proposedTransactionCreationRequestedEvent = PublishProposedTransactionCreationRequestedService.makeNewProposedTransactionCreationRequestedEventConditionally(plannedTransactionProjection);
    return proposedTransactionCreationRequestedEvent;
  }
  constructor() {
    super();
    const continuationHandler = new ContinuationHandler(PlannedTransactionCreatedEvent, PublishProposedTransactionCreationRequestedService.processTransactionCreatedEvent);
    this.Link(continuationHandler);
    PublishProposedTransactionCreationRequestedService.processNewDay();
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
    PublishProposedTransactionCreationRequestedService.processNewDay();
    const oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
    setInterval(PublishProposedTransactionCreationRequestedService.processNewDay, oneDay);
  }
}

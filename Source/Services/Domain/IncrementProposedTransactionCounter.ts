import { ProposedTransactionCreatedEvent } from "../../Events/Created/ProposedTransactionCreatedEvent";
import { PlannedTransactionProjection } from "../../Projections/PlannedTransactionProjection";
import { ProposedTransactionProjection } from "../../Projections/ProposedTransactionProjection";
import { Receiver } from "../Core/Receiver";

export class IncrementProposedTransactionCounter extends Receiver<ProposedTransactionCreatedEvent> {
  public static Instance = new IncrementProposedTransactionCounter(ProposedTransactionCreatedEvent);
  public async Receive(event: ProposedTransactionCreatedEvent): Promise<void> {
    const proposedTransaction = await ProposedTransactionProjection.Get(event.ProposedTransactionId);
    const plannedTransaction = await PlannedTransactionProjection.Get(proposedTransaction.PlannedTransactionId);
    plannedTransaction.TimesRepeated += 1;
    await plannedTransaction.Update();
    return new Promise((resolve, reject) => resolve());
  }
}

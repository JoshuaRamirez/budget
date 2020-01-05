import { User } from "../../../Core/User";
import { PlannedTransactionProjection } from "../../../Projections/PlannedTransactionProjection";

export class TransactionProposition {
  public static GetProposedDate(plannedTransactionProjection: PlannedTransactionProjection): Date {
    const today = User.GetDate();
    if (plannedTransactionProjection.RepeatCount >= plannedTransactionProjection.TimesRepeated) {
      return;
    }
    if (plannedTransactionProjection.StartDate > today) {
      return;
    }
    let proposedDate: Date;
    if (plannedTransactionProjection.ProposedTransactionIds.length === 0) {
      proposedDate = plannedTransactionProjection.StartDate;
    }
    if (plannedTransactionProjection.ProposedTransactionIds.length > 0) {
      const lastProposedTransaction = PlannedTransactionProjection.Last();
      const nextDate = lastProposedTransaction.Date;
      nextDate.setDate(nextDate.getDate() + plannedTransactionProjection.RepeatPeriod);
      proposedDate = nextDate;
    }
    return proposedDate;
  }
}

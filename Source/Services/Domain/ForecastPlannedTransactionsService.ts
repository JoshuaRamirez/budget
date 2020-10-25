import { ForecastRequestedEvent } from "../../Events/Requested/Creation/ForecastRequestedEvent";
import { ForecastCalculationRequestEvent } from "../../Events/Requested/Mutation/ForecastCalculationRequestedEvent";
import { PlannedDepositProjection } from "../../Projections/PlannedDepositProjection";
import { PlannedExpenseProjection } from "../../Projections/PlannedExpenseProjection";
import { PlannedTransactionProjection } from "../../Projections/PlannedTransactionProjection";
import { Receiver } from "../Core/Receiver";
import { TransactionScheduling } from "./Core/TransactionScheduling";

export class ForecastPlannedTransactionsService extends Receiver<ForecastCalculationRequestEvent> {
  public static Instance = new ForecastPlannedTransactionsService();
  private constructor() {
    super(ForecastCalculationRequestEvent);
  }
  public async Receive(event: ForecastCalculationRequestEvent): Promise<void> {
    const startDate = new Date(event.StartDate);
    const endDate = new Date(event.EndDate);
    startDate.setHours(0, 0, 0, 0);
    endDate.setHours(0, 0, 0, 0);
    if (event.StartDate > event.EndDate) {
      return;
    }
    let days = TransactionScheduling.createDays(startDate, endDate);
    const plannedTransactions = await PlannedTransactionProjection.All();
    if (plannedTransactions.length === 0) {
      throw new Error("Missing PlannedTransactionProjection Data.");
    }
    plannedTransactions.forEach(TransactionScheduling.validatedPlannedTransaction);
    const startingBalance = event.StartingBalance;
    days = TransactionScheduling.applyAmounts(days, plannedTransactions, startingBalance);
    for (const day of days) {
      const plannedDepositIds = (await PlannedDepositProjection.All()).map(plannedDeposit => plannedDeposit.Id);
      const plannedExpenseIds = (await PlannedExpenseProjection.All()).map(plannedExpense => plannedExpense.Id);
      const forecastRequestedEvent = new ForecastRequestedEvent();
      forecastRequestedEvent.Amount = day.amount;
      forecastRequestedEvent.Date = day.date;
      forecastRequestedEvent.PlannedDepositIds = plannedDepositIds;
      forecastRequestedEvent.PlannedExpenseIds = plannedExpenseIds;
      await forecastRequestedEvent.Publish();
    }
    return new Promise((resolve, reject) => resolve());
  }
}

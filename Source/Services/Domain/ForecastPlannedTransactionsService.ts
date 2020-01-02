import { ForecastRequestedEvent } from "../../Events/Requested/Creation/ForecastRequestedEvent";
import { ForecastCalculationRequestEvent } from "../../Events/Requested/Mutation/ForecastCalculationRequested";
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
  public Receive(event: ForecastCalculationRequestEvent) {
    if (event.StartDate > event.EndDate) {
      return;
    }
    let days = TransactionScheduling.createDays(event.StartDate, event.EndDate);
    const plannedTransactions = PlannedTransactionProjection.All();
    if (plannedTransactions.length === 0) {
      throw new Error("Missing PlannedTransactionProjection Data.");
    }
    plannedTransactions.forEach(TransactionScheduling.validatedPlannedTransaction);
    days = TransactionScheduling.applyAmounts(days, plannedTransactions);
    days.forEach((day) => {
      const plannedDepositIds = PlannedDepositProjection.All().map((plannedDeposit) => plannedDeposit.Id);
      const plannedExpenseIds = PlannedExpenseProjection.All().map((plannedExpense) => plannedExpense.Id);
      const forecastRequestedEvent = new ForecastRequestedEvent();
      forecastRequestedEvent.Amount = day.amount;
      forecastRequestedEvent.Date = day.date;
      forecastRequestedEvent.PlannedDepositIds = plannedDepositIds;
      forecastRequestedEvent.PlannedExpenseIds = plannedExpenseIds;
      forecastRequestedEvent.Publish();
    });
  }


}

import { ForecastCalculationRequestEvent } from "../Events/ForecastCalculationRequested";
import { ForecastRequestedEvent } from "../Events/ForecastRequestedEvent";
import { PlannedDepositProjection } from "../Projections/PlannedDepositProjection";
import { PlannedExpenseProjection } from "../Projections/PlannedExpenseProjection";
import { PlannedTransactionProjection } from "../Projections/PlannedTransactionProjection";
import { Handler } from "./Core/Handler";
import { TransactionScheduling } from "./Domain/Core/TransactionScheduling";

// TODO: Rename file to match class name.
export class ForecastPlannedTransactionsService extends Handler<ForecastCalculationRequestEvent> {
  public static Instance = new ForecastPlannedTransactionsService();
  private constructor() {
    super(ForecastCalculationRequestEvent);
  }
  public Handle(event: ForecastCalculationRequestEvent) {
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

import { ForecastCalculationRequestEvent } from "../Events/ForecastCalculationRequested";
import { ForecastRequestedEvent } from "../Events/ForecastRequestedEvent";
import { IPlannedTransaction } from "../Projections/Core/IPlannedTransaction";
import { ForecastProjection } from "../Projections/ForecastProjection";
import { PlannedDepositProjection } from "../Projections/PlannedDepositProjection";
import { PlannedExpenseProjection } from "../Projections/PlannedExpenseProjection";
import { Handler } from "./Core/Handler";

enum PlannedTransactionType {
  Deposit = "Deposit",
  Expense = "Expense",
}

class Context {
  public StartDate: Date;
  public EndDate: Date;
  public StartingBalance: number;
  public NewForecastProjections: ForecastProjection[];
  public ExistingPlannedDepositProjections: PlannedDepositProjection[];
  public ExistingPlannedExpenseProjections: PlannedExpenseProjection[];
}

export class ForecastPlannedTransactionsService extends Handler<ForecastCalculationRequestEvent> {
  public static Instance = new ForecastPlannedTransactionsService();
  private static getInstanceCount(repeatStart: Date, endDate: Date, repeatPeriod: number, repeatCount: number) {
    const oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
    const firstDate = new Date(repeatStart);
    const secondDate = new Date(endDate);
    const ticksDiff = Math.abs(firstDate.getTime() - secondDate.getTime());
    const daysDiff = Math.round(ticksDiff / oneDay) + 1;
    let instanceCount = Math.ceil(daysDiff / repeatPeriod);
    if (repeatCount && instanceCount > repeatCount) {
      instanceCount = repeatCount;
    }
    return instanceCount;
  }
  private static createNewForecastProjections(startingBalance: number = 0, startDate: Date, endDate: Date) {
    const forecastProjections: ForecastProjection[] = [];
    const day = new Date(startDate);
    while (day <= endDate) {
      const forecastProjection = new ForecastProjection();
      forecastProjection.Amount = startingBalance;
      forecastProjection.Date = new Date(day);
      forecastProjections.push(forecastProjection);
      day.setDate(day.getDate() + 1);
    }
    return forecastProjections;
  }
  private static planInstanceDates(plannedTransaction: IPlannedTransaction, context: Context) {
    const endDate = context.EndDate;
    const repeatPeriod = plannedTransaction.RepeatPeriod;
    const repeatCount = plannedTransaction.RepeatCount;
    const startDate = context.StartDate;
    const instanceCount = ForecastPlannedTransactionsService.getInstanceCount(startDate, endDate, repeatPeriod, repeatCount);
    const plannedInstanceDates: Date[] = [];
    for (let i = 0; i < instanceCount; i++) {
      const day = new Date(startDate);
      day.setDate(startDate.getDate() + (i * repeatPeriod));
      if (day <= endDate) {
        plannedInstanceDates.push(day);
      }
      if (day > endDate) {
        throw new Error("Inconceivable!");
      }
    }
    return plannedInstanceDates;
  }
  private constructor() {
    super(ForecastCalculationRequestEvent);
  }
  public Handle(event: ForecastCalculationRequestEvent) {
    if (event.StartDate > event.EndDate) {
      return;
    }
    const newForecastProjections = ForecastPlannedTransactionsService.createNewForecastProjections(event.StartingBalance, event.StartDate, event.EndDate);
    const existingPlannedDepositProjections = PlannedDepositProjection.All();
    const existingPlannedExpenseProjections = PlannedExpenseProjection.All();
    const context = new Context();
    context.StartDate = event.StartDate;
    context.EndDate = event.EndDate;
    context.NewForecastProjections = newForecastProjections;
    context.ExistingPlannedDepositProjections = existingPlannedDepositProjections;
    context.ExistingPlannedExpenseProjections = existingPlannedExpenseProjections;
    this.process(context);
    newForecastProjections.forEach((forecastProjection) => {
      const forecastRequestedEvent = new ForecastRequestedEvent(forecastProjection);
      forecastRequestedEvent.Publish();
    });
  }
  private process(context: Context) {
    this.processPlannedTransactions(PlannedTransactionType.Deposit, context);
    this.processPlannedTransactions(PlannedTransactionType.Expense, context);
  }
  private processPlannedTransactions(type: PlannedTransactionType,  context: Context) {
    let plannedTransactions: IPlannedTransaction[];
    if (type === PlannedTransactionType.Deposit) {
      plannedTransactions = context.ExistingPlannedDepositProjections;
    } else if (type === PlannedTransactionType.Expense) {
      plannedTransactions = context.ExistingPlannedExpenseProjections;
    }
    plannedTransactions.forEach((plannedTransaction) => {
      this.validatedPlannedTransaction(plannedTransaction, context);
      this.calculateForecastBalances(type, plannedTransaction, context);
    });
  }
  private validatedPlannedTransaction(plannedTransaction: IPlannedTransaction, context: Context) {
    const endDate = context.EndDate;
    if (!plannedTransaction.RepeatStart) {
      throw new Error("Missing Data in IPlannedTransaction: RepeatStart");
    }
    if (!plannedTransaction.RepeatPeriod) {
      throw new Error("Missing Data in IPlannedTransaction: RepeatPeriod");
    }
    if (plannedTransaction.RepeatStart > endDate) {
      return;
    }
  }
  private calculateForecastBalances(type: PlannedTransactionType, plannedTransaction: IPlannedTransaction, context: Context) {
    const forecastProjections = context.NewForecastProjections;
    const plannedInstanceDates = ForecastPlannedTransactionsService.planInstanceDates(plannedTransaction, context);
    let runningTotal = forecastProjections[0].Amount;
    let transactionalAmount = plannedTransaction.Amount;
    if (type === PlannedTransactionType.Expense) {
      transactionalAmount = transactionalAmount * -1;
    }
    forecastProjections.forEach((forecastProjection) => {
      runningTotal = this.calculateForecastBalance(type, plannedTransaction.Id, forecastProjection, transactionalAmount, runningTotal, plannedInstanceDates);
    });
  }
  private calculateForecastBalance(
    type: PlannedTransactionType, plannedTransactionId: any,
    forecastProjection: ForecastProjection,
    transactionalAmount: number,
    runningTotal: number,
    plannedInstanceDates: Date[],
  ) {
    let forThisDay = false;
    plannedInstanceDates.forEach((plannedInstanceDate) => {
      if (forecastProjection.Date.valueOf() === plannedInstanceDate.valueOf()) {
        forThisDay = true;
      }
    });
    if (forThisDay) {
      runningTotal += transactionalAmount;
      forecastProjection.Amount = runningTotal;
      forecastProjection["Planned" + type + "Ids"].push(plannedTransactionId);
    } else {
      forecastProjection.Amount = runningTotal;
    }
    return runningTotal;
  }
}

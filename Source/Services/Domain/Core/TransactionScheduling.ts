import { IPlannedTransaction } from "../../../Projections/Core/IPlannedTransaction";
import { PlannedTransactionProjection } from "../../../Projections/PlannedTransactionProjection";

export class TransactionScheduling {
  public static applyAmounts = (toDays, plannedTransactions, startingBalance: number) => {
    let runningTotal = 0;
    if (startingBalance) {
      runningTotal += startingBalance;
    }
    toDays.forEach(currentDay => {
      plannedTransactions.forEach((plannedTransaction: PlannedTransactionProjection) => {
        const startDate = new Date(plannedTransaction.StartDate);
        startDate.setHours(0, 0, 0, 0);
        const hasPlanStarted = () => {
          return currentDay.date >= startDate;
        };
        const isRecurrenceCountReached = () => {
          if (!plannedTransaction.RepeatCount) {
            return false;
          }
          const timesRepeated = (plannedTransaction as any).timesRepeatedInForecast;
          if (plannedTransaction.RepeatCount < timesRepeated) {
            return false;
          }
          if (timesRepeated >= plannedTransaction.RepeatCount) {
            return true;
          }
          if (timesRepeated < plannedTransaction.RepeatCount) {
            return false;
          }
        };
        const isForCurrentDay = () => {
          const currentDateNumber = currentDay.date.getDate();
          const startDateNumber = startDate.getDate();
          const differenceInDays = currentDateNumber - startDateNumber;
          const remainder = differenceInDays % plannedTransaction.RepeatPeriod;
          return remainder === 0;
        };
        if (!hasPlanStarted()) {
          return;
        }
        if (isRecurrenceCountReached()) {
          return;
        }
        if (isForCurrentDay()) {
          if (plannedTransaction.TransactionType === "Expense") {
            runningTotal -= plannedTransaction.Amount;
          }
          if (plannedTransaction.TransactionType === "Deposit") {
            runningTotal += plannedTransaction.Amount;
          }
          if (!(plannedTransaction as any).timesRepeatedInForecast) {
            (plannedTransaction as any).timesRepeatedInForecast = 0;
          }
          (plannedTransaction as any).timesRepeatedInForecast += 1;
        }
      });
      currentDay.amount = runningTotal;
    });
    return toDays;
  };

  public static createDays = (startDate, stopDate) => {
    const createDay = (date: Date) => {
      return {
        date
      };
    };
    const oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
    const ticksDiff = Math.abs(stopDate.getTime() - startDate.getTime());
    const daysDiff = Math.round(ticksDiff / oneDay) + 1;
    // tslint:disable-next-line:no-shadowed-variable
    const days = [];
    for (let i = 0; i < daysDiff; i++) {
      const date = new Date(startDate);
      date.setDate(startDate.getDate() + i);
      const day = createDay(date);
      days.push(day);
    }
    return days;
  };

  public static validatedPlannedTransaction(plannedTransaction: IPlannedTransaction) {
    if (!plannedTransaction.StartDate) {
      throw new Error("Missing Data in IPlannedTransaction: RepeatStart");
    }
    if (!plannedTransaction.RepeatPeriod) {
      throw new Error("Missing Data in IPlannedTransaction: RepeatPeriod");
    }
  }
}

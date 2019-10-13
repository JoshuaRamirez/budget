import { assert } from "chai";
import "mocha";
import { Event } from "../../../Source/Events/Core/Event";
import { ForecastCalculationRequestEvent } from "../../../Source/Events/ForecastCalculationRequested";
import { PlannedDepositRequestedEvent } from "../../../Source/Events/PlannedDepositRequestedEvent";
import { PlannedExpenseRequestedEvent } from "../../../Source/Events/PlannedExpenseRequestedEvent";
import { IPlannedTransaction } from "../../../Source/Projections/Core/IPlannedTransaction";
import { ProjectionStore } from "../../../Source/Projections/Core/ProjectionStore";
import { ForecastProjection } from "../../../Source/Projections/ForecastProjection";
import { PlannedDepositProjection } from "../../../Source/Projections/PlannedDepositProjection";
import { PlannedExpenseProjection } from "../../../Source/Projections/PlannedExpenseProjection";
import { Subscriptions } from "../../../Source/Services/Core/Subscriptions";

describe("ForecastPlannedTransactionsService", () => {
  beforeEach(() => {
    Subscriptions.Release();
    Subscriptions.Create();
    ProjectionStore.Instance.ClearAll();
  });
  const projectPlannedTransaction = (type: string,  amount: number, repeatStart: Date = undefined, repeatPeriod: number = undefined, repeatCount: number = undefined) => {
    let plannedTransaction: IPlannedTransaction;
    if (type === "Expense") {
      plannedTransaction = new PlannedExpenseProjection();
    }
    if (type === "Deposit") {
      plannedTransaction = new PlannedDepositProjection();
    }
    plannedTransaction.Amount = amount;
    plannedTransaction.RepeatCount = repeatCount;
    plannedTransaction.RepeatPeriod = repeatPeriod;
    plannedTransaction.RepeatStart = repeatStart;
    plannedTransaction.Project();
    return plannedTransaction;
  };
  const createCalculationEvent = (type: string,  amount: number, repeatStart: Date, repeatPeriod: number, forecastDayCount: number): Event => {
    const startDate = new Date("1/1/19");
    const endDate = new Date(startDate.valueOf());
    endDate.setDate(startDate.getDate() + forecastDayCount - 1);
    projectPlannedTransaction(type, amount, repeatStart, repeatPeriod);
    const event = new ForecastCalculationRequestEvent();
    event.StartDate = startDate;
    event.EndDate = endDate;
    return event;
  };
  const checkForSingleTransactionPlanResults = (type: string, amount: number,  repeatPeriod: number, forecastDayCount: number) => {
    const startDate = new Date("1/1/19");
    const forecastProjections = ForecastProjection.All();
    assert.equal(forecastProjections.length, forecastDayCount);
    const thisDate = new Date(startDate.valueOf());
    let amountTotal = Math.ceil(forecastDayCount / repeatPeriod) * amount;
    if (type === "Expense") {
      amountTotal = amountTotal * -1;
    }
    forecastProjections.forEach((forecastProjection, index) => {
      let forecastTransactionIdCount = 0;
      if (index === 0 || index % repeatPeriod === 0) {
        forecastTransactionIdCount += 1;
      }
      thisDate.setDate(startDate.getDate() + index);
      assert.equal(forecastProjection["Planned" + type + "Ids"].length, forecastTransactionIdCount);
      assert.equal(forecastProjections[forecastProjections.length - 1].Amount, amountTotal);
      assert.equal(forecastProjection.Date.toDateString(), thisDate.toDateString());
    });
  };
  const actWithSingleDeposit = (amount: number, repeatStart: Date, repeatPeriod: number, startDate: Date, endDate: Date) => {
    publishPlannedDepositRequestedEvent(amount,  repeatStart, repeatPeriod);
    publishCalculateRequestedEvent(startDate, endDate);
  };
  const actWithSingleExpense = (amount: number, repeatStart: Date, repeatPeriod: number, startDate: Date, endDate: Date) => {
    publishPlannedExpenseRequestedEvent(amount,  repeatStart, repeatPeriod);
    publishCalculateRequestedEvent(startDate, endDate);
  };
  const publishPlannedDepositRequestedEvent = (amount: number, repeatStart: Date, repeatPeriod: number) => {
    const plannedDepositRequestedEvent = new PlannedDepositRequestedEvent();
    plannedDepositRequestedEvent.Amount = amount;
    plannedDepositRequestedEvent.RepeatPeriod = repeatPeriod;
    plannedDepositRequestedEvent.RepeatStart = repeatStart;
    plannedDepositRequestedEvent.Publish();
  };
  const publishPlannedExpenseRequestedEvent = (amount: number, repeatStart: Date, repeatPeriod: number) => {
    const plannedExpenseRequestedEvent = new PlannedExpenseRequestedEvent();
    plannedExpenseRequestedEvent.Amount = amount;
    plannedExpenseRequestedEvent.RepeatPeriod = repeatPeriod;
    plannedExpenseRequestedEvent.RepeatStart = repeatStart;
    plannedExpenseRequestedEvent.Publish();
  };
  const publishCalculateRequestedEvent = (startDate: Date, endDate: Date) => {
    const forecastCalculationRequestEvent = new ForecastCalculationRequestEvent();
    forecastCalculationRequestEvent.StartDate = startDate;
    forecastCalculationRequestEvent.EndDate = endDate;
    forecastCalculationRequestEvent.StartingBalance = 0;
    forecastCalculationRequestEvent.Publish();
  };
  const runTest = (type, context) => {
    const amount = context.amount;
    const repeatStart = context.repeatStart;
    const repeatPeriod = context.repeatPeriod;
    const startDate = context.startDate;
    const endDate = context.endDate;
    if (type === "Deposit") {
      actWithSingleDeposit(amount, repeatStart, repeatPeriod, startDate, endDate);
    }
    if (type === "Expense") {
      actWithSingleExpense(amount, repeatStart, repeatPeriod, startDate, endDate);
    }
  };
  const runTestCorrectNumberOfForecasts = (type,  context) => {
    runTest(type,  context);
    const actual = ForecastProjection.All().length;
    const expected = context.expectedNumberOfForecasts;
    assert.equal(actual, expected);
  };
  const runTestCorrectFinalForecastAmount = (type, context) => {
    runTest(type,  context);
    const actual = ForecastProjection.Last().Amount;
    let expected: number;
    if (type === "Deposit") {
      expected = context.expectedFinalDepositAmount;
    }
    if (type === "Expense") {
      expected = context.expectedFinalExpenseAmount;
    }
    assert.equal(actual, expected);
  };
  const runtTests = (context) => {
    let plannedTransactionType;
    plannedTransactionType = "Deposit";
    describe(plannedTransactionType, () => {
      it("Correct Number of Forecasts", () => {
        runTestCorrectNumberOfForecasts(plannedTransactionType, context);
      });
      it("Correct Final Forecast Amount", () => {
        runTestCorrectFinalForecastAmount(plannedTransactionType, context);
      });
    });
    plannedTransactionType = "Expense";
    describe(plannedTransactionType, () => {
      it("Correct Number of Forecasts", () => {
        runTestCorrectNumberOfForecasts(plannedTransactionType, context);
      });
      it("Correct Final Forecast Amount", () => {
        runTestCorrectFinalForecastAmount(plannedTransactionType, context);
      });
    });
  };
  describe("Single Daily Planned Transaction", () => {
    const context = {
      amount: 1,
      endDate: new Date("1/10/19"),
      expectedFinalDepositAmount: 10,
      expectedFinalExpenseAmount: -10,
      expectedNumberOfForecasts: 10,
      repeatPeriod: 1,
      repeatStart: new Date("1/1/19"),
      startDate: new Date("1/1/19"),
    };
    runtTests(context);
  });
  describe("Single Weekly Planned Transaction", () => {
    const context = {
      amount: 1,
      endDate: new Date("1/31/19"),
      expectedFinalDepositAmount: 5,
      expectedFinalExpenseAmount: -5,
      expectedNumberOfForecasts: 31,
      repeatPeriod: 7,
      repeatStart: new Date("1/1/19"),
      startDate: new Date("1/1/19"),
    };
    runtTests(context);
  });
  describe("Single Daily Planned Transaction Starting in Middle of Repeat Window", () => {
    const context = {
      amount: 1,
      endDate: new Date("1/10/19"),
      expectedFinalDepositAmount: 10,
      expectedFinalExpenseAmount: -10,
      expectedNumberOfForecasts: 10,
      repeatPeriod: 1,
      repeatStart: new Date("12/22/18"),
      startDate: new Date("1/1/19"),
    };
    runtTests(context);
  });
  describe("Single Every Other Day Planned Transaction Starting in Middle of Repeat Window", () => {
    const context = {
      amount: 1,
      endDate: new Date("1/10/19"),
      expectedFinalDepositAmount: 3,
      expectedFinalExpenseAmount: -3,
      expectedNumberOfForecasts: 5,
      repeatPeriod: 2,
      repeatStart: new Date("12/22/18"),
      startDate: new Date("1/6/19"),
    };
    runtTests(context);
  });
  describe("Auto Generated Tests", () => {
    const tests = 10;
    const forecastDayCount = 10;
    const repeatStart = new Date("1/1/19");
    describe("Deposits", () => {
      describe("Daily", () => {
        for (let i = 0; i < tests; i++) {
          const amount = i + 1;
          const repeatPeriod = i + 1;
          it("Deposit " + amount, () => {
            const event = createCalculationEvent("Deposit", amount, repeatStart, repeatPeriod, forecastDayCount);
            event.Publish();
            checkForSingleTransactionPlanResults("Deposit", amount, repeatPeriod, forecastDayCount);
          });
        }
      });
      describe("Variant Periods", () => {
        for (let i = 0; i < tests; i++) {
          const amount = i + 1;
          const repeatPeriod = i + 1;
          it("Deposit " + amount, () => {
            const event = createCalculationEvent("Deposit", amount, repeatStart, repeatPeriod, forecastDayCount);
            event.Publish();
            checkForSingleTransactionPlanResults("Deposit", amount, repeatPeriod, forecastDayCount);
          });
        }
      });
    });
    describe("Expenses", () => {
      describe("Daily", () => {
        const repeatPeriod = 1;
        for (let i = 0; i < tests; i++) {
          const amount = i + 1;
          it("Expense " + amount, () => {
            const event = createCalculationEvent("Expense", amount, repeatStart, repeatPeriod, forecastDayCount);
            event.Publish();
            checkForSingleTransactionPlanResults("Expense", amount, repeatPeriod, forecastDayCount);
          });
        }
      });
      describe("Variant Periods", () => {
        for (let i = 0; i < tests; i++) {
          const amount = i + 1;
          const repeatPeriod = i + 1;
          it("Expense " + amount, () => {
            const event = createCalculationEvent("Expense", amount, repeatStart, repeatPeriod, forecastDayCount);
            event.Publish();
            checkForSingleTransactionPlanResults("Expense", amount, repeatPeriod, forecastDayCount);
          });
        }
      });
    });
  });

});

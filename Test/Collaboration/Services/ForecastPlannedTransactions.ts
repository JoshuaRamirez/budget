import { assert } from "chai";
import "mocha";
import { Event } from "../../../Source/Events/Core/Event";
import { ForecastCalculationRequestEvent } from "../../../Source/Events/ForecastCalculationRequested";
import { PlannedDepositRequestedEvent } from "../../../Source/Events/PlannedDepositRequestedEvent";
import { PlannedExpenseRequestedEvent } from "../../../Source/Events/PlannedExpenseRequestedEvent";
import { ProjectionStore } from "../../../Source/Projections/Core/ProjectionStore";
import { ForecastProjection } from "../../../Source/Projections/ForecastProjection";
import { Subscriptions } from "../../../Source/Subscriptions";

describe("ForecastPlannedTransactionsService", () => {
  beforeEach(() => {
    Subscriptions.Release();
    Subscriptions.Create();
    ProjectionStore.Instance.ClearAll();
  });
  const publishPlannedTransactionCreationRequestEvent = (type: string,  amount: number, repeatStart: Date = undefined, repeatPeriod: number = undefined, repeatCount: number = undefined) => {
    let event: PlannedDepositRequestedEvent | PlannedExpenseRequestedEvent;
    if (type === "Deposit") {
      event = new PlannedDepositRequestedEvent();
    }
    if (type === "Expense") {
      event = new PlannedExpenseRequestedEvent();
    }
    event.Amount = amount;
    event.RepeatCount = repeatCount;
    event.RepeatPeriod = repeatPeriod;
    event.RepeatStart = repeatStart;
    event.RepeatMeasurement = "TODO";
    event.Publish();
  };
  const createForecastCalculationRequestedEvent = (forecastDayCount: number): Event => {
    const startDate = new Date("1/1/19");
    const endDate = new Date("1/1/19");
    endDate.setDate(endDate.getDate() + forecastDayCount - 1);
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
      thisDate.setDate(startDate.getDate() + index);
      assert.equal(forecastProjections[forecastProjections.length - 1].Amount, amountTotal);
      assert.equal(forecastProjection.Date.toDateString(), thisDate.toDateString());
    });
  };
  const actWithSingleDeposit = (amount: number, repeatStart: Date, repeatPeriod: number, startDate: Date, endDate: Date) => {
    publishPlannedDepositRequestedEvent(amount,  repeatStart, repeatPeriod);
    publishForecastCalculationRequestedEvent(startDate, endDate);
  };
  const actWithSingleExpense = (amount: number, repeatStart: Date, repeatPeriod: number, startDate: Date, endDate: Date) => {
    publishPlannedExpenseRequestedEvent(amount,  repeatStart, repeatPeriod);
    publishForecastCalculationRequestedEvent(startDate, endDate);
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
  const publishForecastCalculationRequestedEvent = (startDate: Date, endDate: Date) => {
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
          const repeatPeriod = 1;
          const type = "Deposit";
          it(type + " " + amount, () => {
            publishPlannedTransactionCreationRequestEvent(type, amount, repeatStart, repeatPeriod);
            const event = createForecastCalculationRequestedEvent(forecastDayCount);
            event.Publish();
            checkForSingleTransactionPlanResults(type, amount, repeatPeriod, forecastDayCount);
          });
        }
      });
      describe("Variant Periods", () => {
        for (let i = 0; i < tests; i++) {
          const amount = i + 1;
          const repeatPeriod = i + 1;
          const type = "Deposit";
          it(type + " " + amount, () => {
            publishPlannedTransactionCreationRequestEvent(type, amount, repeatStart, repeatPeriod);
            const event = createForecastCalculationRequestedEvent(forecastDayCount);
            event.Publish();
            checkForSingleTransactionPlanResults(type, amount, repeatPeriod, forecastDayCount);
          });
        }
      });
    });
    describe("Expenses", () => {
      describe("Daily", () => {
        for (let i = 0; i < tests; i++) {
          const amount = i + 1;
          const repeatPeriod = 1;
          const type = "Expense";
          it(type + " " + amount, () => {
            publishPlannedTransactionCreationRequestEvent(type, amount, repeatStart, repeatPeriod);
            const event = createForecastCalculationRequestedEvent(forecastDayCount);
            event.Publish();
            checkForSingleTransactionPlanResults(type, amount, repeatPeriod, forecastDayCount);
          });
        }
      });
      describe("Variant Periods", () => {
        for (let i = 0; i < tests; i++) {
          const amount = i + 1;
          const repeatPeriod = i + 1;
          const type = "Expense";
          it(type + "" + amount, () => {
            publishPlannedTransactionCreationRequestEvent(type, amount, repeatStart, repeatPeriod);
            const event = createForecastCalculationRequestedEvent(forecastDayCount);
            event.Publish();
            checkForSingleTransactionPlanResults(type, amount, repeatPeriod, forecastDayCount);
          });
        }
      });
    });
  });

});

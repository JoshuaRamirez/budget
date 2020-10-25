import { assert } from "chai";
import "mocha";
import { Event } from "../../../../Source/Events/Core/Event";
import { PlannedDepositRequestedEvent } from "../../../../Source/Events/Requested/Creation/PlannedDepositRequestedEvent";
import { PlannedExpenseRequestedEvent } from "../../../../Source/Events/Requested/Creation/PlannedExpenseRequestedEvent";
import { ForecastCalculationRequestEvent } from "../../../../Source/Events/Requested/Mutation/ForecastCalculationRequestedEvent";
import { ForecastProjection } from "../../../../Source/Projections/ForecastProjection";
import { System } from "../../../../Source/System/System";

describe("ForecastPlannedTransactionsService", () => {
  beforeEach(async () => {
    await System.Shutdown();
    await System.Startup();
  });
  const publishPlannedTransactionCreationRequestEvent = async (type: string, amount: number, repeatStart: Date = undefined, repeatPeriod: number = undefined, repeatCount: number = undefined): Promise<void> => {
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
    await event.Publish();
    return new Promise((resolve, reject) => resolve());
  };
  const createForecastCalculationRequestedEvent = async (forecastDayCount: number): Promise<Event> => {
    const startDate = new Date("1/1/19");
    const endDate = new Date("1/1/19");
    endDate.setDate(endDate.getDate() + forecastDayCount - 1);
    const event = new ForecastCalculationRequestEvent();
    event.StartDate = startDate;
    event.EndDate = endDate;
    return new Promise((resolve, reject) => resolve(event));
  };
  const checkForSingleTransactionPlanResults = async (type: string, amount: number, repeatPeriod: number, forecastDayCount: number): Promise<void> => {
    const startDate = new Date("1/1/19");
    const forecastProjections = await ForecastProjection.All();
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
    return new Promise((resolve, reject) => resolve());
  };
  const actWithSingleDeposit = async (amount: number, repeatStart: Date, repeatPeriod: number, startDate: Date, endDate: Date): Promise<void> => {
    await publishPlannedDepositRequestedEvent(amount, repeatStart, repeatPeriod);
    await publishForecastCalculationRequestedEvent(startDate, endDate);
    return new Promise((resolve, reject) => resolve());
  };
  const actWithSingleExpense = async (amount: number, repeatStart: Date, repeatPeriod: number, startDate: Date, endDate: Date): Promise<void> => {
    await publishPlannedExpenseRequestedEvent(amount, repeatStart, repeatPeriod);
    await publishForecastCalculationRequestedEvent(startDate, endDate);
    return new Promise((resolve, reject) => resolve());
  };
  const publishPlannedDepositRequestedEvent = async (amount: number, repeatStart: Date, repeatPeriod: number): Promise<void> => {
    const plannedDepositRequestedEvent = new PlannedDepositRequestedEvent();
    plannedDepositRequestedEvent.Amount = amount;
    plannedDepositRequestedEvent.RepeatPeriod = repeatPeriod;
    plannedDepositRequestedEvent.RepeatStart = repeatStart;
    await plannedDepositRequestedEvent.Publish();
  };
  const publishPlannedExpenseRequestedEvent = async (amount: number, repeatStart: Date, repeatPeriod: number): Promise<void> => {
    const plannedExpenseRequestedEvent = new PlannedExpenseRequestedEvent();
    plannedExpenseRequestedEvent.Amount = amount;
    plannedExpenseRequestedEvent.RepeatPeriod = repeatPeriod;
    plannedExpenseRequestedEvent.RepeatStart = repeatStart;
    await plannedExpenseRequestedEvent.Publish();
  };
  const publishForecastCalculationRequestedEvent = async (startDate: Date, endDate: Date): Promise<void> => {
    const forecastCalculationRequestEvent = new ForecastCalculationRequestEvent();
    forecastCalculationRequestEvent.StartDate = startDate;
    forecastCalculationRequestEvent.EndDate = endDate;
    forecastCalculationRequestEvent.StartingBalance = 0;
    await forecastCalculationRequestEvent.Publish();
  };
  const runTest = async (type, context): Promise<void> => {
    const amount = context.amount;
    const repeatStart = context.repeatStart;
    const repeatPeriod = context.repeatPeriod;
    const startDate = context.startDate;
    const endDate = context.endDate;
    if (type === "Deposit") {
      await actWithSingleDeposit(amount, repeatStart, repeatPeriod, startDate, endDate);
    }
    if (type === "Expense") {
      await actWithSingleExpense(amount, repeatStart, repeatPeriod, startDate, endDate);
    }
  };
  const runTestCorrectNumberOfForecasts = async (type, context) => {
    await runTest(type, context);
    const actual = (await ForecastProjection.All()).length;
    const expected = context.expectedNumberOfForecasts;
    assert.equal(actual, expected);
  };
  const runTestCorrectFinalForecastAmount = async (type, context) => {
    await runTest(type, context);
    const actual = (await ForecastProjection.Last()).Amount;
    let expected: number;
    if (type === "Deposit") {
      expected = context.expectedFinalDepositAmount;
    }
    if (type === "Expense") {
      expected = context.expectedFinalExpenseAmount;
    }
    assert.equal(actual, expected);
  };
  const runtTests = context => {
    let plannedTransactionType;
    plannedTransactionType = "Deposit";
    describe(plannedTransactionType, () => {
      it("Correct Number of Forecasts", async () => {
        await runTestCorrectNumberOfForecasts(plannedTransactionType, context);
      });
      it("Correct Final Forecast Amount", async () => {
        await runTestCorrectFinalForecastAmount(plannedTransactionType, context);
      });
    });
    plannedTransactionType = "Expense";
    describe(plannedTransactionType, () => {
      it("Correct Number of Forecasts", async () => {
        await runTestCorrectNumberOfForecasts(plannedTransactionType, context);
      });
      it("Correct Final Forecast Amount", async () => {
        await runTestCorrectFinalForecastAmount(plannedTransactionType, context);
      });
    });
  };
  describe("Single Daily Planned Transaction", async () => {
    const context = {
      amount: 1,
      endDate: new Date("1/10/19"),
      expectedFinalDepositAmount: 10,
      expectedFinalExpenseAmount: -10,
      expectedNumberOfForecasts: 10,
      repeatPeriod: 1,
      repeatStart: new Date("1/1/19"),
      startDate: new Date("1/1/19")
    };
    runtTests(context);
  });
  describe("Single Weekly Planned Transaction", async () => {
    const context = {
      amount: 1,
      endDate: new Date("1/31/19"),
      expectedFinalDepositAmount: 5,
      expectedFinalExpenseAmount: -5,
      expectedNumberOfForecasts: 31,
      repeatPeriod: 7,
      repeatStart: new Date("1/1/19"),
      startDate: new Date("1/1/19")
    };
    runtTests(context);
  });
  describe("Single Daily Planned Transaction Starting in Middle of Repeat Window", async () => {
    const context = {
      amount: 1,
      endDate: new Date("1/10/19"),
      expectedFinalDepositAmount: 10,
      expectedFinalExpenseAmount: -10,
      expectedNumberOfForecasts: 10,
      repeatPeriod: 1,
      repeatStart: new Date("12/22/18"),
      startDate: new Date("1/1/19")
    };
    runtTests(context);
  });
  describe("Single Every Other Day Planned Transaction Starting in Middle of Repeat Window", async () => {
    const context = {
      amount: 1,
      endDate: new Date("1/10/19"),
      expectedFinalDepositAmount: 3,
      expectedFinalExpenseAmount: -3,
      expectedNumberOfForecasts: 5,
      repeatPeriod: 2,
      repeatStart: new Date("12/22/18"),
      startDate: new Date("1/6/19")
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
          it(type + " " + amount, async () => {
            await publishPlannedTransactionCreationRequestEvent(type, amount, repeatStart, repeatPeriod);
            const event = await createForecastCalculationRequestedEvent(forecastDayCount);
            await event.Publish();
            await checkForSingleTransactionPlanResults(type, amount, repeatPeriod, forecastDayCount);
          });
        }
      });
      describe("Variant Periods", () => {
        for (let i = 0; i < tests; i++) {
          const amount = i + 1;
          const repeatPeriod = i + 1;
          const type = "Deposit";
          it(type + " " + amount, async () => {
            await publishPlannedTransactionCreationRequestEvent(type, amount, repeatStart, repeatPeriod);
            const event = await createForecastCalculationRequestedEvent(forecastDayCount);
            await event.Publish();
            await checkForSingleTransactionPlanResults(type, amount, repeatPeriod, forecastDayCount);
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
          it(type + " " + amount, async () => {
            await publishPlannedTransactionCreationRequestEvent(type, amount, repeatStart, repeatPeriod);
            const event = await createForecastCalculationRequestedEvent(forecastDayCount);
            await event.Publish();
            await checkForSingleTransactionPlanResults(type, amount, repeatPeriod, forecastDayCount);
          });
        }
      });
      describe("Variant Periods", () => {
        for (let i = 0; i < tests; i++) {
          const amount = i + 1;
          const repeatPeriod = i + 1;
          const type = "Expense";
          it(type + "" + amount, async () => {
            await publishPlannedTransactionCreationRequestEvent(type, amount, repeatStart, repeatPeriod);
            const event = await createForecastCalculationRequestedEvent(forecastDayCount);
            await event.Publish();
            await checkForSingleTransactionPlanResults(type, amount, repeatPeriod, forecastDayCount);
          });
        }
      });
    });
  });
});

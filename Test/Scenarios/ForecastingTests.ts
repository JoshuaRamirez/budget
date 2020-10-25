import { PlannedDepositRequestedEvent } from "../../Source/Events/Requested/Creation/PlannedDepositRequestedEvent";
import { PlannedExpenseRequestedEvent } from "../../Source/Events/Requested/Creation/PlannedExpenseRequestedEvent";
import { UserRequestedEvent } from "../../Source/Events/Requested/Creation/UserRequestedEvent";
import { ForecastCalculationRequestEvent } from "../../Source/Events/Requested/Mutation/ForecastCalculationRequestedEvent";
import { ForecastProjection } from "../../Source/Projections/ForecastProjection";
import { System } from "../../Source/System/System";

const startDate = new Date("1/1/2020");
const endDate = new Date("2/1/2020");

const newDeposit = async (description, amount, repeatCount, repeatPeriod): Promise<void> => {
  const event = new PlannedDepositRequestedEvent();
  event.Amount = amount;
  event.Description = description;
  event.RepeatCount = repeatCount;
  event.RepeatPeriod = repeatPeriod;
  event.RepeatStart = startDate;
  await event.Publish();
  return new Promise((resolve, reject) => resolve());
};

const newExpense = async (description, amount, repeatCount, repeatPeriod): Promise<void> => {
  const event = new PlannedExpenseRequestedEvent();
  event.Amount = amount;
  event.Description = description;
  event.RepeatCount = repeatCount;
  event.RepeatPeriod = repeatPeriod;
  event.RepeatStart = startDate;
  await event.Publish();
  return new Promise((resolve, reject) => resolve());
};

describe("Forecasting", () => {
  before(async () => {
    await System.Startup();
  });

  it("Creating Setup", async () => {
    const event = new UserRequestedEvent();
    event.UserName = "Test";
    await event.Publish();
  });

  it("Creating Expenses...", async () => {
    await newExpense("Transportation", 30, -1, 1);
    await newExpense("Lodging", 700, -1, 7);
    await newExpense("Food", 50, -1, 1);
    await newExpense("Subs", 300, -1, 30);
    await newExpense("Children", 875, -1, 7);
  });

  it("Creating Deposits", async () => {
    await newDeposit("Income", 2500, -1, 7);
  });

  it("Running Forecast", async () => {
    const event = new ForecastCalculationRequestEvent();
    event.StartDate = startDate;
    event.EndDate = endDate;
    event.StartingBalance = 1500;
    await event.Publish();
  });

  it("Results", async () => {
    const results = await ForecastProjection.All();
    results.forEach(x => {
      console.log(`${x.Date}: ${x.Amount} | Expenses: Pending | Deposits: Pending`);
    });
  });

  after(async () => {
    await System.Shutdown();
  });
});

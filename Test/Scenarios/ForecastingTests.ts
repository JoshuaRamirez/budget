import { PlannedDepositRequestedEvent } from "../../Source/Events/Requested/Creation/PlannedDepositRequestedEvent";
import { PlannedExpenseRequestedEvent } from "../../Source/Events/Requested/Creation/PlannedExpenseRequestedEvent";
import { UserRequestedEvent } from "../../Source/Events/Requested/Creation/UserRequestedEvent";
import { ForecastCalculationRequestEvent } from "../../Source/Events/Requested/Mutation/ForecastCalculationRequestedEvent";
import { ForecastProjection } from "../../Source/Projections/ForecastProjection";
import { System } from "../../Source/System/System";

const startDate = new Date("1/1/2020");
const endDate = new Date("2/1/2020");

const newDeposit = (description, amount, repeatCount, repeatPeriod) => {
  const event = new PlannedDepositRequestedEvent();
  event.Amount = amount;
  event.Description = description;
  event.RepeatCount = repeatCount;
  event.RepeatPeriod = repeatPeriod;
  event.RepeatStart = startDate;
  event.Publish();
};

const newExpense = (description, amount, repeatCount, repeatPeriod) => {
  const event = new PlannedExpenseRequestedEvent();
  event.Amount = amount;
  event.Description = description;
  event.RepeatCount = repeatCount;
  event.RepeatPeriod = repeatPeriod;
  event.RepeatStart = startDate;
  event.Publish();
};

describe("Forecasting", () => {
  before(() => {
    System.Startup();
  });

  it("Creating Setup", () => {
    const event = new UserRequestedEvent();
    event.UserName = "Test";
    event.Publish();
  });

  it("Creating Expenses...", () => {
    newExpense("Transportation", 30, -1, 1);
    newExpense("Lodging", 700, -1, 7);
    newExpense("Food", 50, -1, 1);
    newExpense("Subs", 300, -1, 30);
    newExpense("Children", 875, -1, 7);
  });

  it("Creating Deposits", () => {
    newDeposit("Income", 2500, -1, 7);
  });

  it("Running Forecast", () => {
    const event = new ForecastCalculationRequestEvent();
    event.StartDate = startDate;
    event.EndDate = endDate;
    event.StartingBalance = 1500;
    event.Publish();
  });

  it("Results", () => {
    const results = ForecastProjection.All();
    results.forEach(x => {
      console.log(`${x.Date}: ${x.Amount} | Expenses: Pending | Deposits: Pending`);
    });
  });

  after(() => {
    System.Shutdown();
  });
});

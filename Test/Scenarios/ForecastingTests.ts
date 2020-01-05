import { PlannedDepositRequestedEvent } from "../../Source/Events/Requested/Creation/PlannedDepositRequestedEvent";
import { PlannedExpenseRequestedEvent } from "../../Source/Events/Requested/Creation/PlannedExpenseRequestedEvent";
import { UserRequestedEvent } from "../../Source/Events/Requested/Creation/UserRequestedEvent";
import { ForecastCalculationRequestEvent } from "../../Source/Events/Requested/Mutation/ForecastCalculationRequested";
import { ForecastProjection } from "../../Source/Projections/ForecastProjection";
import { System } from "../../Source/System/System";

const newDeposit = (description, amount, repeatCount, repeatPeriod) => {
  const event = new PlannedDepositRequestedEvent();
  event.Amount = amount;
  event.Description = description;
  event.RepeatCount = repeatCount;
  event.RepeatPeriod = repeatPeriod;
  event.RepeatStart = new Date();
  event.Publish();
};

const newExpense = (description, amount, repeatCount, repeatPeriod) => {
  const event = new PlannedExpenseRequestedEvent();
  event.Amount = amount;
  event.Description = description;
  event.RepeatCount = repeatCount;
  event.RepeatPeriod = repeatPeriod;
  event.RepeatStart = new Date();
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
  });

  it("Creating Deposits", () => {
    newDeposit("Income", 2500, -1, 7);
  });

  it("Running Forecast", () => {
    const event = new ForecastCalculationRequestEvent();
    event.StartDate = new Date("1/1/2020");
    event.EndDate = new Date("2/5/2020");
    event.StartingBalance = 1500;
    event.Publish();
  });

  it("Results", () => {
    const results = ForecastProjection.All();
    results.forEach(x => {
      console.log(`${x.Date}: ${x.Amount} | Expenses: Pending | Deposits: Pending`);
      // TODO: The starting balance should be taken into account during the calculation.
      // TODO: The start date for the planned expenses and deposits is the 4th (today)
      // TODO: It should still calculate the balance for the 1st, 2nd, and 3rd
    });
  });

  after(() => {
    System.Shutdown();
  });
});

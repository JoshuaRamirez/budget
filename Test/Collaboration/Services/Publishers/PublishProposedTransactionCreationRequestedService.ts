import { assert } from "chai";
import { User } from "../../../../Source/Core/User";
import { PlannedTransactionRequestedEvent } from "../../../../Source/Events/Requested/Creation/PlannedTransactionRequestedEvent";
import { ProjectionStore } from "../../../../Source/Projections/Core/ProjectionStore";
import { ProposedTransactionProjection } from "../../../../Source/Projections/ProposedTransactionProjection";
import { Subscriptions } from "../../../../Source/Subscriptions";

describe("RequestProposedTransactionService", () => {
  beforeEach(() => {
    Subscriptions.Release();
    Subscriptions.Create();
    ProjectionStore.Instance.ClearAll();
  });
  const makePlannedTransactionRequestForToday = (repeatStart = new Date()) => {
    const plannedTransactionCreationRequestedEvent = new PlannedTransactionRequestedEvent();
    plannedTransactionCreationRequestedEvent.Amount = 10;
    plannedTransactionCreationRequestedEvent.Description = "Test";
    plannedTransactionCreationRequestedEvent.RepeatCount = 1;
    plannedTransactionCreationRequestedEvent.RepeatMeasurement = "Days";
    plannedTransactionCreationRequestedEvent.RepeatPeriod = 1;
    plannedTransactionCreationRequestedEvent.RepeatStart = repeatStart;
    plannedTransactionCreationRequestedEvent.RepeatStart.setHours(0, 0, 0, 0);
    return plannedTransactionCreationRequestedEvent;
  };
  it("should necessitate the creation of a proposed transaction after the creation of a planned transaction for today's date.", () => {
    const plannedTransactionCreationRequestedEvent = makePlannedTransactionRequestForToday();
    plannedTransactionCreationRequestedEvent.Publish();
    const proposedTransactions = ProposedTransactionProjection.All();
    const proposedTransaction = proposedTransactions[0];
    assert.exists(proposedTransaction);
  });
  it("should ", () => {
    const tomorrow = User.GetDate();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const plannedTransactionCreationRequestedEvent = makePlannedTransactionRequestForToday(tomorrow);
    plannedTransactionCreationRequestedEvent.Publish();
    const proposedTransactions = ProposedTransactionProjection.All();
    const expected = 0;
    const actual = proposedTransactions.length;
    assert.equal(actual, expected);
  });
});

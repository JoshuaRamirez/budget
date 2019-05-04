import { assert } from "chai";
import "mocha";
import { EventStore } from "../../../source/Core/EventStore";
import { AccountRequestedEvent } from "../../../source/Events/AccountRequestedEvent";
import { AllocationRequestedEvent } from "../../../source/Events/AllocationRequestedEvent";
import { ExpenseCreatedEvent } from "../../../source/Events/ExpenseCreatedEvent";
import { LedgerRequestedEvent } from "../../../source/Events/LedgerRequestedEvent";
import { PlannedExpenseRequestedEvent } from "../../../source/Events/PlannedExpenseRequestedEvent";
import { TransactionCreatedEvent } from "../../../source/Events/TransactionCreatedEvent";
import { TransactionRequestedEvent } from "../../../source/Events/TransactionRequestedEvent";

describe("EventStore", () => {
  let eventStore: EventStore;
  beforeEach(() => {
    eventStore = new EventStore();
  });
  it("should instantiate.", () => {
    assert.exists(eventStore);
  });
  describe("should without any exceptions", () => {
    it("record AccountRequestedEvent", () => {
      eventStore.Record<AccountRequestedEvent>(new AccountRequestedEvent());
    });
    it("should record AllocationRequestedEvent", () => {
      eventStore.Record<AllocationRequestedEvent>(new AllocationRequestedEvent());
    });
    it("should record ExpenseCreatedEvent", () => {
      eventStore.Record<ExpenseCreatedEvent>(new ExpenseCreatedEvent());
    });
    it("should record LedgerRequestedEvent", () => {
      eventStore.Record<LedgerRequestedEvent>(new LedgerRequestedEvent());
    });
    it("should record PlannedExpenseRequestedEvent", () => {
      eventStore.Record<PlannedExpenseRequestedEvent>(new PlannedExpenseRequestedEvent());
    });
    it("should record TransactionCreatedEvent", () => {
      eventStore.Record<TransactionCreatedEvent>(new TransactionCreatedEvent(Date.now().toString(), Date.now()));
    });
    it("should record TransactionRequestedEvent", () => {
      eventStore.Record<TransactionRequestedEvent>(new TransactionRequestedEvent(Date.now().toString(), Date.now()));
    });
  });
});

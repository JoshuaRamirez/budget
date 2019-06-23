import { assert } from "chai";
import "mocha";
import { TransactionCreatedEvent } from "../../../source/Events/TransactionCreatedEvent";
import {CreateExpenseService} from "../../../source/Services/CreateExpenseService";

describe("CreateExpenseService", () => {
  it("should import", () => {
    assert.exists(CreateExpenseService);
  });
  it("should instantiate", () => {
    const service = new CreateExpenseService();
    assert.exists(service);
  });
  it("should instantiate with singleton", () => {
    const service = CreateExpenseService.Instance;
    assert.exists(service);
  });
  it("should process", () => {
    const service = CreateExpenseService.Instance;
    const event = new TransactionCreatedEvent("a", 1);
    service.Process(event);
  });
});

import { assert } from "chai";
import "mocha";
import { TransactionRequestedEvent } from "../../../../source/Events/TransactionRequestedEvent";
import {CreateTransactionService} from "../../../../source/Services/Creates/CreateTransactionService";

describe("CreateTransactionService", () => {
  it("should import", () => {
    assert.exists(CreateTransactionService);
  });
  it("should instantiate with singleton", () => {
    const service = CreateTransactionService.Instance;
    assert.exists(service);
  });
  it("should process", () => {
    const service = CreateTransactionService.Instance;
    const event = new TransactionRequestedEvent();
    service.Handle(event);
  });
});

import { assert } from "chai";
import "mocha";
import { TransactionRequestedEvent } from "../../../../Source/Events/Requested/Creation/TransactionRequestedEvent";
import {CreateTransactionService} from "../../../../Source/Services/Creates/CreateTransactionService";

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
    service.Receive(event);
  });
});

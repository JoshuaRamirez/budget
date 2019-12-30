import { assert } from "chai";
import "mocha";
import { ProposedTransactionCreationRequestedEvent } from "../../../../Source/Events/ProposedTransactionCreationRequestedEvent";
import { CreateProposedTransactionService } from "../../../../Source/Services/Creates/CreateProposedTransactionService";

describe("CreateProposedTransactionService", () => {
  it("should import", () => {
    assert.exists(CreateProposedTransactionService);
  });
  it("should instantiate with singleton", () => {
    const service = CreateProposedTransactionService.Instance;
    assert.exists(service);
  });
  it("should process", () => {
    const service = CreateProposedTransactionService.Instance;
    const event = new ProposedTransactionCreationRequestedEvent();
    service.Handle(event);
  });
});

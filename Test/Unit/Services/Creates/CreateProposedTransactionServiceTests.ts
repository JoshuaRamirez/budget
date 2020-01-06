import { assert } from "chai";
import "mocha";
import { ProposedTransactionRequestedEvent } from "../../../../Source/Events/Requested/Creation/ProposedTransactionRequestedEvent";
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
    const event = new ProposedTransactionRequestedEvent();
    service.Receive(event);
  });
});

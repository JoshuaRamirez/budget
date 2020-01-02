import { assert } from "chai";
import "mocha";
import { LedgerRequestedEvent } from "../../../../Source/Events/Requested/Creation/LedgerRequestedEvent";
import {CreateLedgerService} from "../../../../Source/Services/Creates/CreateLedgerService";

describe("CreateLedgerService", () => {
  it("should import", () => {
    assert.exists(CreateLedgerService);
  });
  it("should instantiate with singleton", () => {
    const createLedgerService = CreateLedgerService.Instance;
    assert.exists(createLedgerService);
  });
  it("should process", () => {
    const service = CreateLedgerService.Instance;
    const event = new LedgerRequestedEvent();
    service.Receive(event);
  });
});

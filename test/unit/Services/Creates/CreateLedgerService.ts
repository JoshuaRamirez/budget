import { assert } from "chai";
import "mocha";
import { LedgerRequestedEvent } from "../../../../source/Events/LedgerRequestedEvent";
import {CreateLedgerService} from "../../../../source/Services/Creates/CreateLedgerService";

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
    service.Handle(event);
  });
});

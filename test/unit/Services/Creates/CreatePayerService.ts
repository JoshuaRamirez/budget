import { assert } from "chai";
import "mocha";
import { PayerRequestedEvent } from "../../../../source/Events/PayerRequestedEvent";
import {CreatePayerService} from "../../../../source/Services/Creates/CreatePayerService";

describe("CreatePayerService", () => {
  it("should import", () => {
    assert.exists(CreatePayerService);
  });
  it("should instantiate with singleton", () => {
    const service = CreatePayerService.Instance;
    assert.exists(service);
  });
  it("should process", () => {
    const service = CreatePayerService.Instance;
    const event = new PayerRequestedEvent();
    service.Handle(event);
  });
});

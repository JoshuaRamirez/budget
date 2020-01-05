import { assert } from "chai";
import "mocha";
import { PayeeRequestedEvent } from "../../../../Source/Events/Requested/Creation/PayeeRequestedEvent";
import { CreatePayeeService } from "../../../../Source/Services/Creates/CreatePayeeService";

describe("CreatePayeeService", () => {
  it("should import", () => {
    assert.exists(CreatePayeeService);
  });
  it("should instantiate with singleton", () => {
    const service = CreatePayeeService.Instance;
    assert.exists(service);
  });
  it("should process", () => {
    const service = CreatePayeeService.Instance;
    const event = new PayeeRequestedEvent();
    service.Receive(event);
  });
});

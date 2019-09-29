import { assert } from "chai";
import "mocha";
import { PayeeRequestedEvent } from "../../../../source/Events/PayeeRequestedEvent";
import {CreatePayeeService} from "../../../../source/Services/Creates/CreatePayeeService";

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
    service.Handle(event);
  });
});

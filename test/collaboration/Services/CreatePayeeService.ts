import { assert } from "chai";
import "mocha";
import { ProjectionStore } from "../../../source/Core/ProjectionStore";
import { PayeeRequestedEvent } from "../../../source/Events/PayeeRequestedEvent";
import { PayeeProjection } from "../../../source/Projections/PayeeProjection";
import { CreatePayeeService } from "../../../source/Services/CreatePayeeService";


describe("CreatePayeeService", () => {
  it("should create projection", () => {
    const service = CreatePayeeService.Instance;
    service.Subscribe();
    const event = new PayeeRequestedEvent();
    event.Publish();
    const projectionStore = ProjectionStore.Instance;
    const projections = projectionStore.GetProjections(PayeeProjection);
    const projection = projections[0];
    assert.exists(projection);
  });
});

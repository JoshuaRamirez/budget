import { assert } from "chai";
import "mocha";
import { ForecastProjection } from "../../../Source/Projections/ForecastProjection";

describe("ForecastProjection", () => {
  it("should import", () => {
    assert.exists(ForecastProjection);
  });
  it("should instantiate", () => {
    const forecastProjection = new ForecastProjection();
    assert.exists(forecastProjection);
  });
  it("should get", async () => {
    await ForecastProjection.Get(1);
  });
});

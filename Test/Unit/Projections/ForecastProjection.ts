import { assert } from "chai";
import "mocha";
import {ForecastProjection} from "../../../Source/Projections/ForecastProjection";

describe("ForecastProjection", () => {

  it("should import", () => {
    assert.exists(ForecastProjection);
  });
  it("should instantiate", () => {
    const forecastProjection = new ForecastProjection();
    assert.exists(forecastProjection);
  });
  it("should get", () => {
    ForecastProjection.Get(1);
  });

});

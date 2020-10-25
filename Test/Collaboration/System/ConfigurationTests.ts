import { System } from "../../../Source/System/System";

describe("System", () => {
  it("should startup and shutdown", async () => {
    await System.Shutdown();
    await System.Startup();
  });
});

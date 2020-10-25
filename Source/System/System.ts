import { ProjectionStore } from "../Projections/Core/ProjectionStore";
import { Subscriptions } from "../Subscriptions";
import { Configuration } from "./Configuration";
import { Timer } from "./Timer";

export class System {
  public static async Startup(): Promise<void> {
    Configuration.Create();
    Subscriptions.Create();
    Timer.StartDaily();
    return new Promise((resolve, reject) => resolve());
  }
  public static async Shutdown(): Promise<void> {
    Subscriptions.Release();
    Timer.StopAll();
    await ProjectionStore.Instance.ClearAll();
    return new Promise((resolve, reject) => resolve());
  }
}

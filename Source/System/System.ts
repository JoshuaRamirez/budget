import { ProjectionStore } from "../Projections/Core/ProjectionStore";
import { Subscriptions } from "../Subscriptions";
import { Timer } from "./Timer";

export class System {
  public static Startup() {
    Subscriptions.Create();
    Timer.StartDaily();
  }
  public static Shutdown() {
    Subscriptions.Release();
    Timer.StopAll();
    ProjectionStore.Instance.ClearAll();
  }
}

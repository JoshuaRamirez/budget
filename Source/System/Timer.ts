import { User } from "../Core/User";
import { DailyTimerIntervalPublished } from "../Events/System/DailyTimerIntervalPublished";

export class Timer {
  public static StartDaily() {
    const tomorrow = User.GetDate();
    tomorrow.setDate(tomorrow.getDate() + 1);
    // @ts-ignore
    const difference = Math.abs(new Date() - tomorrow);
    this.dailyHandle = setTimeout(this.repeatDaily, difference);
  }
  public static StopAll() {
    this.StopDaily();
  }
  public static StopDaily() {
    clearInterval(this.dailyHandle);
  }
  private static dailyHandle;
  private static repeatDaily() {
    const oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
    setInterval(this.publishInterval, oneDay);
  }
  private static publishInterval() {
    const event = new DailyTimerIntervalPublished();
    event.Publish();
  }
}

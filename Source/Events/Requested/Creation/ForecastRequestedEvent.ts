import { ForecastProjection } from "../../../Projections/ForecastProjection";
import { Event } from "../../Core/Event";
import { Publisher } from "../../Core/Publisher";

export class ForecastRequestedEvent extends Event {
  public Amount: number;
  public CategoryId: any;
  public Date: Date;
  public Notes: string;
  public PlannedDepositIds: any[];
  public PlannedExpenseIds: any[];
  constructor() {
    super();
  }
  public async Publish(): Promise<void> {
    await Publisher.Instance.Publish(this);
    return new Promise((resolve, reject) => resolve());
  }
}

import { Projection } from "./Projection";

export interface IPlannedTransaction extends Projection {
  Id: any;
  Amount: number;
  Description: string;
  RepeatPeriod: number;
  RepeatMeasurement: string;
  RepeatCount: number;
  RepeatStart: Date;
}

export interface IPlannedTransaction {
  Amount: number;
  Description: string;
  RepeatPeriod: number;
  RepeatMeasurement: string;
  RepeatCount: number;
  RepeatStart: Date;
}

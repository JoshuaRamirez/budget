import { Projection } from "../../../Projections/Core/Projection";

export interface ISingleSubjectEventFields<TTargetProjection extends Projection> {
  readonly TargetSubjectIdFieldName: keyof TTargetProjection;
}

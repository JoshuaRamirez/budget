import { Projection } from "../../../Projections/Core/Projection";

export interface ISingleSubjectField<TTargetProjection extends Projection> {
  readonly TargetSubjectIdFieldName: keyof TTargetProjection;
}

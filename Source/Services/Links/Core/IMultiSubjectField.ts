import { Projection } from "../../../Projections/Core/Projection";

export interface IMultiSubjectField<TTargetProjection extends Projection> {
  readonly TargetSubjectIdsFieldName: keyof TTargetProjection;
}

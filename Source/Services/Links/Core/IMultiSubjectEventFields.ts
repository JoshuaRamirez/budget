import { Projection } from "../../../Projections/Core/Projection";

export interface IMultiSubjectEventFields<TTargetProjection extends Projection> {
  readonly TargetSubjectIdsFieldName: keyof TTargetProjection;
}

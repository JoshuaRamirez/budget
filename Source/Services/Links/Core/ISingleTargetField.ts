import { Projection } from "../../../Projections/Core/Projection";

export interface ISingleTargetField<TSubjectProjection extends Projection> {
  readonly SubjectTargetIdFieldName: keyof TSubjectProjection;
}

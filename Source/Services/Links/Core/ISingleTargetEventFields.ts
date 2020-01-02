import { Projection } from "../../../Projections/Core/Projection";

export interface ISingleTargetEventFields<TSubjectProjection extends Projection> {
  readonly SubjectTargetIdFieldName: keyof TSubjectProjection;
}

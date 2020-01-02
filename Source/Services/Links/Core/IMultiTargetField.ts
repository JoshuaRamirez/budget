import { Projection } from "../../../Projections/Core/Projection";

export interface IMultiTargetField<TSubjectProjection extends Projection> {
  readonly SubjectTargetIdsFieldName: keyof TSubjectProjection;
}

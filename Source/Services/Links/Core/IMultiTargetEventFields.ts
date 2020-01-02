import { Projection } from "../../../Projections/Core/Projection";

export interface IMultiTargetEventFields<TSubjectProjection extends Projection> {
  readonly SubjectTargetIdsFieldName: keyof TSubjectProjection;
}

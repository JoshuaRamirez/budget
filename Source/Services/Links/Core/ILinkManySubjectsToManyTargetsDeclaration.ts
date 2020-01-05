import { Event } from "../../../Events/Core/Event";
import { Projection } from "../../../Projections/Core/Projection";
import { IDeclaration } from "./IDeclaration";
import { IMultiSubjectField } from "./IMultiSubjectField";
import { IMultiTargetField } from "./IMultiTargetField";

export interface ILinkManySubjectsToManyTargetsDeclaration<TEvent extends Event, TSubjectProjection extends Projection, TTargetProjection extends Projection>
  extends IDeclaration<TEvent>,
    IMultiSubjectField<TTargetProjection>,
    IMultiTargetField<TSubjectProjection> {}

import { Event } from "../../../Events/Core/Event";
import { Projection } from "../../../Projections/Core/Projection";
import { IDeclaration } from "./IDeclaration";
import { ISingleSubjectField } from "./ISingleSubjectField";
import { ISingleTargetField } from "./ISingleTargetField";

export interface ILinkOneSubjectToOneTargetDeclaration<TEvent extends Event, TSubjectProjection extends Projection, TTargetProjection extends Projection>
  extends IDeclaration<TEvent>,
    ISingleSubjectField<TTargetProjection>,
    ISingleTargetField<TSubjectProjection> {}

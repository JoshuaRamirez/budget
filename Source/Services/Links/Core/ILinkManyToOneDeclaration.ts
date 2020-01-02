import { Event } from "../../../Events/Core/Event";
import { Projection } from "../../../Projections/Core/Projection";
import { IDeclaration } from "./IDeclaration";
import { IMultiSubjectEventFields } from "./IMultiSubjectEventFields";
import { ISingleTargetEventFields } from "./ISingleTargetEventFields";

export interface ILinkManyToOneDeclaration
<
  TEvent extends Event,
  TSubjectProjection extends Projection,
  TTargetProjection extends Projection
>
extends
  IDeclaration<TEvent>,
  IMultiSubjectEventFields<TTargetProjection>,
  ISingleTargetEventFields<TSubjectProjection> {}

import { Event } from "../../../Events/Core/Event";
import { Projection } from "../../../Projections/Core/Projection";
import { IDeclaration } from "./IDeclaration";
import { IMultiSubjectEventFields } from "./IMultiSubjectEventFields";
import { IMultiTargetEventFields } from "./IMultiTargetEventFields";

export interface ILinkManyToManyDeclaration
<
  TEvent extends Event,
  TSubjectProjection extends Projection,
  TTargetProjection extends Projection
>
extends
  IDeclaration<TEvent>,
  IMultiSubjectEventFields<TTargetProjection>,
  IMultiTargetEventFields<TSubjectProjection> {}

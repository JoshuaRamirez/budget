import { Event } from "../../../Events/Core/Event";
import { Projection } from "../../../Projections/Core/Projection";
import { IDeclaration } from "./IDeclaration";
import { ISingleSubjectEventFields } from "./ISingleSubjectEventFields";
import { ISingleTargetEventFields } from "./ISingleTargetEventFields";

export interface ILinkOneToOneDeclaration<TEvent extends Event, TTargetProjection extends Projection>
  extends
  IDeclaration<TEvent>,
  ISingleSubjectEventFields<TTargetProjection>,
  ISingleTargetEventFields<TEvent> {}

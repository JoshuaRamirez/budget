import { IDeclaration } from "./IDeclaration";
import { ISingleSubjectEventFields } from "./ISingleSubjectEventFields";
import { ISingleTargetEventFields } from "./ISingleTargetEventFields";

export interface ILinkOneToOneDeclaration extends
  IDeclaration,
  ISingleSubjectEventFields,
  ISingleTargetEventFields {}

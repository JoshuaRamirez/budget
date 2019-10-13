import { IDeclaration } from "./IDeclaration";
import { IMultiSubjectEventFields } from "./IMultiSubjectEventFields";
import { ISingleTargetEventFields } from "./ISingleTargetEventFields";

export interface ILinkManyToOneDeclaration extends
  IDeclaration,
  IMultiSubjectEventFields,
  ISingleTargetEventFields {}

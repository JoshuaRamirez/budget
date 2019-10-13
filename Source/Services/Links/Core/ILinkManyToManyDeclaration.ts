import { IDeclaration } from "./IDeclaration";
import { IMultiSubjectEventFields } from "./IMultiSubjectEventFields";
import { IMultiTargetEventFields } from "./IMultiTargetEventFields";

export interface ILinkManyToManyDeclaration extends
  IDeclaration,
  IMultiSubjectEventFields,
  IMultiTargetEventFields {}

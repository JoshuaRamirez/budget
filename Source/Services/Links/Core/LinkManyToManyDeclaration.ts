import { LinkServiceDeclarationValidator } from "../Validation/Validators/LinkServiceDeclarationValidator";
import { ILinkManyToManyDeclaration } from "./ILinkManyToManyDeclaration";

export class LinkManyToManyDeclaration implements ILinkManyToManyDeclaration {
  public readonly EventType: any;
  public readonly SubjectType: any;
  public readonly TargetIdsFieldName: string;
  public readonly TargetSubjectIdsFieldName: string;
  public readonly TargetType: any;
  public readonly TriggeringSubjectIdFieldName: string;
  constructor(declaration: ILinkManyToManyDeclaration) {
    if (!declaration) {
      throw new Error("Missing object instance in the provided Declaration.");
    }
    Object.assign(this, {...declaration});
    const linkServiceDeclarationValidator = new LinkServiceDeclarationValidator(declaration);
    linkServiceDeclarationValidator.Validate();
  }
}

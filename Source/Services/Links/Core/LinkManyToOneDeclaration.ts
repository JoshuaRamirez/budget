import { LinkServiceDeclarationValidator } from "../Validation/Validators/LinkServiceDeclarationValidator";
import { ILinkManyToOneDeclaration } from "./ILinkManyToOneDeclaration";

export class LinkManyToOneDeclaration implements ILinkManyToOneDeclaration {
  public readonly EventType: any;
  public readonly SubjectType: any;
  public readonly TargetIdFieldName: string;
  public readonly TargetType: any;
  public readonly TargetSubjectIdsFieldName: string;
  public readonly TriggeringSubjectIdFieldName: string;
  constructor(declaration: ILinkManyToOneDeclaration) {
    if (!declaration) {
      throw new Error("Missing object instance in the provided Declaration.");
    }
    Object.assign(this, {...declaration});
    const linkServiceDeclarationValidator = new LinkServiceDeclarationValidator(declaration);
    linkServiceDeclarationValidator.Validate();
  }
}

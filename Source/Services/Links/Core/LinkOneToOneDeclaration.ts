import { LinkServiceDeclarationValidator } from "../Validation/Validators/LinkServiceDeclarationValidator";
import { ILinkOneToOneDeclaration } from "./ILinkOneToOneDeclaration";

export class LinkOneToOneDeclaration implements ILinkOneToOneDeclaration {
  public readonly EventType: any;
  public readonly SubjectType: any;
  public readonly TargetType: any;
  public readonly TargetIdFieldName: string;
  public readonly TargetSubjectIdFieldName: string;
  public readonly SubjectIdFieldName: string;
  constructor(declaration: ILinkOneToOneDeclaration) {
    if (!declaration) {
      throw new Error("Missing object instance in the provided Declaration.");
    }
    Object.assign(this, {...declaration});
    const linkServiceDeclarationValidator = new LinkServiceDeclarationValidator(declaration);
    linkServiceDeclarationValidator.Validate();
  }
}

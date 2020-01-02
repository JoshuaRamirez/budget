import { Event } from "../../../Events/Core/Event";
import { Projection } from "../../../Projections/Core/Projection";
import { LinkServiceDeclarationValidator } from "../Validation/Validators/LinkServiceDeclarationValidator";
import { ILinkOneSubjectToOneTargetDeclaration } from "./ILinkOneSubjectToOneTargetDeclaration";

export class LinkOneSubjectToOneTargetDeclaration
<
  TEvent extends Event,
  TSubjectProjection extends Projection,
  TTargetProjection extends Projection
>
implements ILinkOneSubjectToOneTargetDeclaration<TEvent, TSubjectProjection, TTargetProjection> {
  public readonly EventType: TEvent;
  public readonly SubjectType: any;
  public readonly TargetType: any;
  public readonly SubjectTargetIdFieldName: keyof TSubjectProjection;
  public readonly TargetSubjectIdFieldName: keyof TTargetProjection;
  public readonly SubjectIdFieldName: keyof TEvent;
  constructor(declaration: ILinkOneSubjectToOneTargetDeclaration<TEvent, TSubjectProjection, TTargetProjection>) {
    if (!declaration) {
      throw new Error("Missing object instance in the provided Declaration.");
    }
    Object.assign(this, {...declaration});
    const linkServiceDeclarationValidator = new LinkServiceDeclarationValidator(declaration);
    linkServiceDeclarationValidator.Validate();
  }
}

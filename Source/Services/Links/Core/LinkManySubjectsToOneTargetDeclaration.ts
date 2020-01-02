import { Event } from "../../../Events/Core/Event";
import { Projection } from "../../../Projections/Core/Projection";
import { LinkServiceDeclarationValidator } from "../Validation/Validators/LinkServiceDeclarationValidator";
import { ILinkManySubjectsToOneTargetDeclaration } from "./ILinkManySubjectsToOneTargetDeclaration";

export class LinkManySubjectsToOneTargetDeclaration
<
  TEvent extends Event,
  TSubjectProjection extends Projection,
  TTargetProjection extends Projection
>
implements ILinkManySubjectsToOneTargetDeclaration<TEvent, TSubjectProjection, TTargetProjection> {
  public readonly EventType: any;
  public readonly SubjectTargetIdFieldName: keyof TSubjectProjection;
  public readonly SubjectType: any;
  public readonly TargetType: any;
  public readonly TargetSubjectIdsFieldName: keyof TTargetProjection;
  public readonly SubjectIdFieldName: keyof TEvent;
  constructor(declaration: ILinkManySubjectsToOneTargetDeclaration<TEvent, TSubjectProjection, TTargetProjection>) {
    if (!declaration) {
      throw new Error("Missing object instance in the provided Declaration.");
    }
    Object.assign(this, {...declaration});
    const linkServiceDeclarationValidator = new LinkServiceDeclarationValidator(declaration);
    linkServiceDeclarationValidator.Validate();
  }
}

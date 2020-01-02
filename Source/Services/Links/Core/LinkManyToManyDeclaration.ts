import { Event } from "../../../Events/Core/Event";
import { Projection } from "../../../Projections/Core/Projection";
import { LinkServiceDeclarationValidator } from "../Validation/Validators/LinkServiceDeclarationValidator";
import { ILinkManyToManyDeclaration } from "./ILinkManyToManyDeclaration";

export class LinkManyToManyDeclaration<TEvent extends Event, TSubjectProjection extends Projection, TTargetProjection extends Projection> implements ILinkManyToManyDeclaration<TEvent, TSubjectProjection, TTargetProjection> {
  public readonly EventType: any;
  public readonly SubjectType: any;
  public readonly SubjectTargetIdsFieldName: keyof TSubjectProjection;
  public readonly TargetSubjectIdsFieldName: keyof TTargetProjection;
  public readonly TargetType: any;
  public readonly SubjectIdFieldName: keyof TEvent;
  constructor(declaration: ILinkManyToManyDeclaration<TEvent, TSubjectProjection, TTargetProjection>) {
    if (!declaration) {
      throw new Error("Missing object instance in the provided Declaration.");
    }
    Object.assign(this, {...declaration});
    const linkServiceDeclarationValidator = new LinkServiceDeclarationValidator(declaration);
    linkServiceDeclarationValidator.Validate();
  }
}

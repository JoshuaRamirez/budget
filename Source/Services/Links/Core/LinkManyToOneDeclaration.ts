import { Event } from "../../../Events/Core/Event";
import { Projection } from "../../../Projections/Core/Projection";
import { LinkServiceDeclarationValidator } from "../Validation/Validators/LinkServiceDeclarationValidator";
import { ILinkManyToOneDeclaration } from "./ILinkManyToOneDeclaration";

export class LinkManyToOneDeclaration<TEvent extends Event, TSubjectProjection extends Projection, TTargetProjection extends Projection> implements ILinkManyToOneDeclaration<TEvent, TTargetProjection> {
  public readonly EventType: any;
  public readonly SubjectType: any;
  public readonly TargetIdFieldName: keyof TEvent;
  public readonly TargetType: any;
  public readonly TargetSubjectIdsFieldName: keyof TTargetProjection;
  public readonly SubjectIdFieldName: keyof TEvent;
  constructor(declaration: ILinkManyToOneDeclaration<TEvent, TTargetProjection>) {
    if (!declaration) {
      throw new Error("Missing object instance in the provided Declaration.");
    }
    Object.assign(this, {...declaration});
    const linkServiceDeclarationValidator = new LinkServiceDeclarationValidator(declaration);
    linkServiceDeclarationValidator.Validate();
  }
}

import { Event } from "../../../Events/Core/Event";
import { Projection } from "../../../Projections/Core/Projection";
import { LinkServiceDeclarationValidator } from "../Validation/Validators/LinkServiceDeclarationValidator";
import { ILinkOneToOneDeclaration } from "./ILinkOneToOneDeclaration";

export class LinkOneToOneDeclaration<TEvent extends Event, TSubjectProjection extends Projection, TTargetProjection extends Projection> implements ILinkOneToOneDeclaration<TEvent, TTargetProjection> {
  public readonly EventType: TEvent;
  public readonly SubjectType: any;
  public readonly TargetType: any;
  public readonly TargetIdFieldName: keyof TEvent;
  public readonly TargetSubjectIdFieldName: keyof TTargetProjection;
  public readonly SubjectIdFieldName: keyof TEvent;
  constructor(declaration: ILinkOneToOneDeclaration<TEvent, TTargetProjection>) {
    if (!declaration) {
      throw new Error("Missing object instance in the provided Declaration.");
    }
    Object.assign(this, {...declaration});
    const linkServiceDeclarationValidator = new LinkServiceDeclarationValidator(declaration);
    linkServiceDeclarationValidator.Validate();
  }
}

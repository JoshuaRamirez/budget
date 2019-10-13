import { Event} from "../../../../Events/Core/Event";
import { Projection } from "../../../../Projections/Core/Projection";
import { IDeclaration } from "../../Core/IDeclaration";
import { IMultiSubjectEventFields } from "../../Core/IMultiSubjectEventFields";
import { LinkManyToManyDeclaration } from "../../Core/LinkManyToManyDeclaration";
import { LinkManyToOneDeclaration } from "../../Core/LinkManyToOneDeclaration";
import { LinkServiceProjectionValidationMessage } from "../Messages/LinkServiceProjectionPropertyValidationError";
import { LinkServiceFieldValidator } from "./LinkServiceFieldValidator";

export class LinkServiceProjectionValidator<TEvent extends Event> extends LinkServiceFieldValidator {
  private readonly event: TEvent;
  private readonly declaration: IDeclaration;
  private readonly subjectProjection: Projection;
  private readonly targetProjection: Projection;
  public constructor(declaration: IDeclaration, event: TEvent, subjectProjection: Projection, targetProjection: Projection) {
    super();
    this.event = event;
    this.declaration = declaration;
    this.subjectProjection = subjectProjection;
    this.targetProjection = targetProjection;
  }
  public Validate() {
    if (this.declaration instanceof LinkManyToOneDeclaration) {
      this.validateTargetSubjectIdsFieldExists();
      this.validateTargetSubjectIdsFieldValue();
    }
    if (this.declaration instanceof LinkManyToManyDeclaration) {
      this.validateTargetSubjectIdsFieldExists();
      this.validateTargetSubjectIdsFieldValue();
    }
  }
  private validateTargetSubjectIdsFieldExists() {
    const declaration = (this.declaration as unknown as IMultiSubjectEventFields);
    const projection = this.targetProjection;
    const fieldName = declaration.TargetSubjectIdsFieldName;
    const validationMessage = LinkServiceProjectionValidationMessage.TargetSubjectIdsMissing;
    LinkServiceProjectionValidator.validateProjectionFieldNameExists(projection, fieldName, validationMessage);
  }
  private validateTargetSubjectIdsFieldValue() {
    const declaration = (this.declaration as unknown as IMultiSubjectEventFields);
    const projection = this.targetProjection;
    const fieldName = declaration.TargetSubjectIdsFieldName;
    const validationMessage = LinkServiceProjectionValidationMessage.TargetSubjectIdsInvalid;
    LinkServiceProjectionValidator.validateProjectionArrayFieldValue(projection, fieldName, validationMessage);
  }
}

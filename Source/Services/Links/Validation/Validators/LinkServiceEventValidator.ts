import { Event} from "../../../../Events/Core/Event";
import { IDeclaration } from "../../Core/IDeclaration";
import { IMultiTargetEventFields } from "../../Core/IMultiTargetEventFields";
import { ISingleTargetEventFields } from "../../Core/ISingleTargetEventFields";
import { LinkManyToManyDeclaration } from "../../Core/LinkManyToManyDeclaration";
import { LinkManyToOneDeclaration } from "../../Core/LinkManyToOneDeclaration";
import { LinkOneToOneDeclaration } from "../../Core/LinkOneToOneDeclaration";
import { LinkServiceEventValidationMessage } from "../Messages/LinkServiceEventValidationMessage";
import { LinkServiceFieldValidator } from "./LinkServiceFieldValidator";

export class LinkServiceEventValidator<TEvent extends Event> extends LinkServiceFieldValidator {
  private readonly event: TEvent;
  private readonly declaration: IDeclaration;
  public constructor(declaration: IDeclaration, event: TEvent) {
    super();
    this.event = event;
    this.declaration = declaration;
  }
  public Validate() {
    this.validateTriggeringSubjectIdFieldExists();
    this.validateTriggeringSubjectIdFieldValue();
    if (this.declaration instanceof LinkOneToOneDeclaration) {
      this.validateTargetIdFieldExists();
      this.validateTargetIdFieldValue();
    }
    if (this.declaration instanceof LinkManyToOneDeclaration) {
      this.validateTargetIdFieldExists();
      this.validateTargetIdFieldValue();
    }
    if (this.declaration instanceof LinkManyToManyDeclaration) {
      this.validateTargetIdsFieldExists();
      this.validateTargetIdsFieldValue();
    }
  }
  private validateTriggeringSubjectIdFieldExists() {
    const declaration = this.declaration;
    const event = this.event;
    const fieldName = declaration.TriggeringSubjectIdFieldName;
    const validationMessage = LinkServiceEventValidationMessage.TriggeringSubjectIdMissing;
    LinkServiceEventValidator.validateEventFieldNameExists(event, fieldName, validationMessage);
  }
  private validateTriggeringSubjectIdFieldValue() {
    const declaration = this.declaration;
    const event = this.event;
    const fieldName = declaration.TriggeringSubjectIdFieldName;
    const validationMessage = LinkServiceEventValidationMessage.TriggeringSubjectIdInvalid;
    LinkServiceEventValidator.validateEventScalarFieldValue(event, fieldName, validationMessage);
  }
  private validateTargetIdFieldExists() {
    const declaration = (this.declaration as unknown as ISingleTargetEventFields);
    const event = this.event;
    const fieldName = declaration.TargetIdFieldName;
    const validationMessage = LinkServiceEventValidationMessage.TargetIdFieldNameMissing;
    LinkServiceEventValidator.validateEventFieldNameExists(event,  fieldName, validationMessage);
  }
  private validateTargetIdFieldValue() {
    const declaration = (this.declaration as unknown as ISingleTargetEventFields);
    const event = this.event;
    const fieldName = declaration.TargetIdFieldName;
    const validationMessage = LinkServiceEventValidationMessage.TargetIdFieldNameInvalid;
    LinkServiceEventValidator.validateEventScalarFieldValue(event, fieldName, validationMessage);
  }
  private validateTargetIdsFieldExists() {
    const declaration = (this.declaration as unknown as IMultiTargetEventFields);
    const event = this.event;
    const fieldName = declaration.SubjectTargetIdsFieldName;
    const validationMessage = LinkServiceEventValidationMessage.TargetIdsFieldNameMissing;
    LinkServiceEventValidator.validateEventFieldNameExists(event,  fieldName, validationMessage);
  }
  private validateTargetIdsFieldValue() {
    const declaration = (this.declaration as unknown as IMultiTargetEventFields);
    const event = this.event;
    const fieldName = declaration.SubjectTargetIdsFieldName;
    const validationMessage = LinkServiceEventValidationMessage.TargetIdsFieldNameInvalid;
    LinkServiceEventValidator.validateEventArrayFieldValue(event, fieldName, validationMessage);
  }
}

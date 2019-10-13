import { Event } from "../../../../Events/Core/Event";
import { IDeclaration } from "../../Core/IDeclaration";
import { LinkManyToManyDeclaration } from "../../Core/LinkManyToManyDeclaration";
import { LinkManyToOneDeclaration } from "../../Core/LinkManyToOneDeclaration";
import { LinkOneToOneDeclaration } from "../../Core/LinkOneToOneDeclaration";
import { LinkServiceDeclarationValidationMessage } from "../Messages/LinkServiceDeclarationValidationMessage";
import { LinkServiceFieldValidator } from "./LinkServiceFieldValidator";

export class LinkServiceDeclarationValidator<TEvent extends Event> extends LinkServiceFieldValidator  {
  private readonly declaration: IDeclaration;
  public constructor(declaration: IDeclaration) {
    super();
    this.declaration = declaration;
  }
  public Validate() {
    this.validateEventTypeExists();
    this.validateEventTypeValue();
    this.validateSubjectTypeExists();
    this.validateSubjectTypeValue();
    this.validateTargetTypeExists();
    this.validateTargetTypeValue();
    this.validateTriggeringSubjectIdFieldNameExists();
    this.validateTriggeringSubjectIdFieldNameValue();
    if (this.declaration instanceof LinkOneToOneDeclaration) {
      this.validateTargetIdFieldNameExists();
      this.validateTargetIdFieldNameValue();
    }
    if (this.declaration instanceof LinkManyToOneDeclaration) {
      this.validateTargetIdFieldNameExists();
      this.validateTargetIdFieldNameValue();
      this.validateTargetSubjectIdsFieldNameExists();
      this.validateTargetSubjectIdsFieldNameValue();
    }
    if (this.declaration instanceof LinkManyToManyDeclaration) {
      this.validateTargetIdsFieldNameExists();
      this.validateTargetIdsFieldNameValue();
      this.validateTargetSubjectIdsFieldNameExists();
      this.validateTargetSubjectIdsFieldNameValue();
    }
  }
  private validateEventTypeExists() {
    const declaration = this.declaration;
    const validationMessage = LinkServiceDeclarationValidationMessage.EventTypeMissing;
    const fieldName = "EventType";
    LinkServiceDeclarationValidator.validateDeclarationFieldNameExists(declaration, fieldName, validationMessage);
  }
  private validateEventTypeValue() {
    const declaration = this.declaration;
    const validationMessage = LinkServiceDeclarationValidationMessage.EventTypeInvalid;
    const fieldName = "EventType";
    LinkServiceDeclarationValidator.validateDeclarationScalarFieldValue(declaration, fieldName, validationMessage);
  }
  private validateSubjectTypeExists() {
    const declaration = this.declaration;
    const validationMessage = LinkServiceDeclarationValidationMessage.SubjectTypeMissing;
    const fieldName = "SubjectType";
    LinkServiceDeclarationValidator.validateDeclarationFieldNameExists(declaration, fieldName, validationMessage);
  }
  private validateSubjectTypeValue() {
    const declaration = this.declaration;
    const validationMessage = LinkServiceDeclarationValidationMessage.SubjectTypeInvalid;
    const fieldName = "SubjectType";
    LinkServiceDeclarationValidator.validateDeclarationScalarFieldValue(declaration, fieldName, validationMessage);
  }
  private validateTriggeringSubjectIdFieldNameExists() {
    const declaration = this.declaration;
    const validationMessage = LinkServiceDeclarationValidationMessage.TriggeringSubjectIdFieldNameMissing;
    const fieldName = "TriggeringSubjectIdFieldName";
    LinkServiceDeclarationValidator.validateDeclarationFieldNameExists(declaration, fieldName, validationMessage);
  }
  private validateTriggeringSubjectIdFieldNameValue() {
    const declaration = this.declaration;
    const validationMessage = LinkServiceDeclarationValidationMessage.TriggeringSubjectIdFieldNameInvalid;
    const fieldName = "TriggeringSubjectIdFieldName";
    LinkServiceDeclarationValidator.validateDeclarationScalarFieldValue(declaration, fieldName, validationMessage);
  }
  private validateTargetSubjectIdsFieldNameExists() {
    const declaration = this.declaration;
    const validationMessage = LinkServiceDeclarationValidationMessage.TargetSubjectIdsFieldNameMissing;
    const fieldName = "TargetSubjectIds";
    LinkServiceDeclarationValidator.validateDeclarationFieldNameExists(declaration, fieldName, validationMessage);
  }
  private validateTargetSubjectIdsFieldNameValue() {
    const declaration = this.declaration;
    const validationMessage = LinkServiceDeclarationValidationMessage.TargetSubjectIdsFieldNameInvalid;
    const fieldName = "TargetSubjectIds";
    LinkServiceDeclarationValidator.validateDeclarationArrayFieldValue(declaration, fieldName, validationMessage);
  }
  private validateTargetTypeExists() {
    const declaration = this.declaration;
    const validationMessage = LinkServiceDeclarationValidationMessage.TargetTypeMissing;
    const fieldName = "TargetType";
    LinkServiceDeclarationValidator.validateDeclarationFieldNameExists(declaration, fieldName, validationMessage);
  }
  private validateTargetTypeValue() {
    const declaration = this.declaration;
    const validationMessage = LinkServiceDeclarationValidationMessage.TargetTypeInvalid;
    const fieldName = "TargetType";
    LinkServiceDeclarationValidator.validateDeclarationScalarFieldValue(declaration, fieldName, validationMessage);
  }
  private validateTargetIdFieldNameExists() {
    const declaration = this.declaration;
    const validationMessage = LinkServiceDeclarationValidationMessage.TargetIdFieldNameMissing;
    const fieldName = "TargetIdFieldName";
    LinkServiceDeclarationValidator.validateDeclarationFieldNameExists(declaration, fieldName, validationMessage);
  }
  private validateTargetIdFieldNameValue() {
    const declaration = this.declaration;
    const validationMessage = LinkServiceDeclarationValidationMessage.TargetIdFieldNameInvalid;
    const fieldName = "TargetIdFieldName";
    LinkServiceDeclarationValidator.validateDeclarationScalarFieldValue(declaration, fieldName, validationMessage);
  }
  private validateTargetIdsFieldNameExists() {
    const declaration = this.declaration;
    const validationMessage = LinkServiceDeclarationValidationMessage.TargetIdsFieldNameMissing;
    const fieldName = "TargetIdsFieldName";
    LinkServiceDeclarationValidator.validateDeclarationFieldNameExists(declaration, fieldName, validationMessage);
  }
  private validateTargetIdsFieldNameValue() {
    const declaration = this.declaration;
    const validationMessage = LinkServiceDeclarationValidationMessage.TargetIdsFieldNameInvalid;
    const fieldName = "TargetIdsFieldName";
    LinkServiceDeclarationValidator.validateDeclarationArrayFieldValue(declaration, fieldName, validationMessage);
  }
}

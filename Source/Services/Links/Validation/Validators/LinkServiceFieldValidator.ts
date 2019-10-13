import { Event } from "../../../../Events/Core/Event";
import { Projection } from "../../../../Projections/Core/Projection";
import { IDeclaration } from "../../Core/IDeclaration";
import { LinkServiceDeclarationFieldInvalidError } from "../../Errors/LinkServiceDeclarationFieldInvalidError";
import { LinkServiceEventFieldInvalidError } from "../../Errors/LinkServiceEventFieldInvalidError";
import { LinkServiceProjectionFieldInvalidError } from "../../Errors/LinkServiceProjectionFieldInvalidError";
import { LinkServiceDeclarationValidationMessage } from "../Messages/LinkServiceDeclarationValidationMessage";
import { LinkServiceEventValidationMessage } from "../Messages/LinkServiceEventValidationMessage";
import { LinkServiceProjectionValidationMessage } from "../Messages/LinkServiceProjectionPropertyValidationError";

export abstract class LinkServiceFieldValidator {
  protected static validateProjectionArrayFieldValue(projection: Projection, fieldName: string, validationMessage: LinkServiceProjectionValidationMessage) {
    const fieldValue = projection[fieldName];
    const projectionName = projection.ProjectionName;
    if (!fieldValue || !Array.isArray(fieldValue)) {
      throw new LinkServiceProjectionFieldInvalidError(projectionName, fieldName, fieldValue, validationMessage);
    }
  }
  protected static validateProjectionFieldNameExists(projection: Projection, fieldName: string, validationMessage: LinkServiceProjectionValidationMessage) {
    const projectionName = projection.ProjectionName;
    if (!projection.hasOwnProperty(fieldName)) {
      throw new LinkServiceProjectionFieldInvalidError(projectionName, fieldName, undefined, validationMessage);
    }
  }
  protected static validateEventScalarFieldValue(event: Event, fieldName: string, validationMessage: LinkServiceEventValidationMessage) {
    const eventName = event.Name;
    const fieldValue = event[fieldName];
    if (!fieldValue || !fieldValue.toString().length) {
      throw new LinkServiceEventFieldInvalidError(eventName, fieldName, fieldValue, validationMessage);
    }
  }
  protected static validateEventArrayFieldValue(event: Event, fieldName: string, validationMessage: LinkServiceEventValidationMessage) {
    const eventName = event.Name;
    const fieldValue = event[fieldName];
    if (!fieldValue || !Array.isArray(fieldValue)) {
      throw new LinkServiceEventFieldInvalidError(eventName, fieldName, fieldValue, validationMessage);
    }
  }
  protected static validateEventFieldNameExists(event: Event, fieldName: string, validationMessage: LinkServiceEventValidationMessage) {
    const eventName = event.Name;
    if (!event.hasOwnProperty(fieldName)) {
      throw new LinkServiceEventFieldInvalidError(eventName, fieldName, undefined, validationMessage);
    }
  }
  protected static validateDeclarationScalarFieldValue(declaration: IDeclaration, fieldName: string, validationMessage: LinkServiceDeclarationValidationMessage) {
    const fieldValue = declaration[fieldName];
    if (!fieldValue || !fieldValue.toString().length) {
      throw new LinkServiceDeclarationFieldInvalidError(typeof declaration, fieldName, fieldValue, validationMessage);
    }
  }
  protected static validateDeclarationArrayFieldValue(declaration: IDeclaration, fieldName: string, validationMessage: LinkServiceDeclarationValidationMessage) {
    const fieldValue = declaration[fieldName];
    if (!fieldValue || !Array.isArray(fieldValue)) {
      throw new LinkServiceDeclarationFieldInvalidError(typeof declaration, fieldName, fieldValue, validationMessage);
    }
  }
  protected static validateDeclarationFieldNameExists(declaration: IDeclaration, fieldName: string, validationMessage: LinkServiceDeclarationValidationMessage) {
    if (!declaration.hasOwnProperty(fieldName)) {
      throw new LinkServiceDeclarationFieldInvalidError(typeof declaration, fieldName, undefined, validationMessage);
    }
  }
}

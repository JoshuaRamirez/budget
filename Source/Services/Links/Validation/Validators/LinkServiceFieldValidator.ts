import { Event } from "../../../../Events/Core/Event";
import { Projection } from "../../../../Projections/Core/Projection";
import { IDeclaration } from "../../Core/IDeclaration";
import { LinkServiceFieldMissingError } from "../../Errors/LinkServiceFieldMissingError";
import { LinkServiceFieldValueMissingError } from "../../Errors/LinkServiceFieldValueMissingError";

export abstract class LinkServiceFieldValidator<TEvent extends Event> {
  protected fieldIsArray(object: IDeclaration<TEvent> | Event | Projection, fieldName: string) {
    const fieldValue = object[fieldName.toString()];
    if (!fieldValue || !Array.isArray(fieldValue)) {
      throw new LinkServiceFieldValueMissingError(object.constructor.name, fieldName, fieldValue);
    }
  }
  protected fieldExists(object: IDeclaration<TEvent> | Event | Projection, fieldName: string) {
    if (!object.hasOwnProperty(fieldName)) {
      throw new LinkServiceFieldMissingError(object.constructor.name, fieldName, undefined);
    }
  }
  protected fieldIsScalar(object: IDeclaration<TEvent> | Event | Projection, fieldName: string) {
    const fieldValue = object[fieldName.toString()];
    if (!fieldValue || !fieldValue.toString().length) {
      throw new LinkServiceFieldValueMissingError(object.constructor.name, fieldName, fieldValue);
    }
  }

}

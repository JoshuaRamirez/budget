import { LinkServiceValidationErrorType } from "../Validation/Messages/LinkServiceValidationErrorType";
import { LinkServiceValidationMessage } from "../Validation/Messages/LinkServiceValidationMessage";
import { LinkServiceFieldValidationError } from "./LinkServiceFieldValidationError";

export class LinkServiceFieldMissingError extends LinkServiceFieldValidationError {
  public constructor(name: string, propertyName: string, propertyValue: string) {
    super(name, propertyName, propertyValue, LinkServiceValidationMessage.FieldMissing, LinkServiceValidationErrorType.FieldMissing);
  }
}

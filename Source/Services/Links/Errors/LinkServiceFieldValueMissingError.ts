import { LinkServiceValidationErrorType } from "../Validation/Messages/LinkServiceValidationErrorType";
import { LinkServiceValidationMessage } from "../Validation/Messages/LinkServiceValidationMessage";
import { LinkServiceFieldValidationError } from "./LinkServiceFieldValidationError";

export class LinkServiceFieldValueMissingError extends LinkServiceFieldValidationError {
  public constructor(declarationName: string, propertyName: string, propertyValue: string) {
    super(declarationName, propertyName, propertyValue, LinkServiceValidationMessage.FieldValueMissing, LinkServiceValidationErrorType.FieldValueMissing);
  }
}

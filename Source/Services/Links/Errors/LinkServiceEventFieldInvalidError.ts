import { LinkServiceEventValidationMessage } from "../Validation/Messages/LinkServiceEventValidationMessage";
import { LinkServiceValidationErrorType } from "../Validation/Messages/LinkServiceValidationErrorType";
import { LinkServiceFieldValidationError } from "./LinkServiceFieldValidationError";

export class LinkServiceEventFieldInvalidError extends LinkServiceFieldValidationError {
  public constructor(
    eventName: string,
    propertyName: string,
    propertyValue: string,
    linkServiceEventValidationMessage: LinkServiceEventValidationMessage,
  ) {
    super(
      eventName,
      propertyName,
      propertyValue,
      linkServiceEventValidationMessage,
      LinkServiceValidationErrorType.InvalidFieldValue,
    );
  }
}

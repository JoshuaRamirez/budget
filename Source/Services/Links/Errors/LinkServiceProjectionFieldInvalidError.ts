import { LinkServiceProjectionValidationMessage } from "../Validation/Messages/LinkServiceProjectionPropertyValidationError";
import { LinkServiceValidationErrorType } from "../Validation/Messages/LinkServiceValidationErrorType";
import { LinkServiceFieldValidationError } from "./LinkServiceFieldValidationError";

export class LinkServiceProjectionFieldInvalidError extends LinkServiceFieldValidationError {
  public constructor(
    projectionName: string,
    propertyName: string,
    propertyValue: string,
    linkServiceProjectionValidationMessage: LinkServiceProjectionValidationMessage,
  ) {
    super(
      projectionName,
      propertyName,
      propertyValue,
      linkServiceProjectionValidationMessage,
      LinkServiceValidationErrorType.InvalidFieldValue,
    );
  }
}


import { LinkServiceDeclarationValidationMessage } from "../Validation/Messages/LinkServiceDeclarationValidationMessage";
import { LinkServiceValidationErrorType } from "../Validation/Messages/LinkServiceValidationErrorType";
import { LinkServiceFieldValidationError } from "./LinkServiceFieldValidationError";

export class LinkServiceDeclarationFieldMissingError extends LinkServiceFieldValidationError {
  public constructor(
    declarationName: string,
    propertyName: string,
    propertyValue: string,
    linkServiceDeclarationValidationMessage: LinkServiceDeclarationValidationMessage,
  ) {
    super(
      declarationName,
      propertyName,
      propertyValue,
      linkServiceDeclarationValidationMessage,
      LinkServiceValidationErrorType.MissingFieldName,
    );
  }
}

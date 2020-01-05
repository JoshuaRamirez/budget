import { LinkServiceValidationErrorType } from "../Validation/Messages/LinkServiceValidationErrorType";
import { MessageToken } from "../Validation/Messages/MessageToken";

export class LinkServiceFieldValidationError extends Error {
  public constructor(offendingObjectName: string, offendingFieldName: string, offendingFieldValue: string, validationErrorMessage: string, validationErrorType: LinkServiceValidationErrorType) {
    validationErrorMessage = validationErrorMessage.replace("{" + MessageToken.FieldName.toString() + "}", offendingFieldName);
    validationErrorMessage = validationErrorMessage.replace("{" + MessageToken.ObjectName.toString() + "}", offendingObjectName);
    const message =
      `Link Service Validation Error:` +
      `\n${validationErrorMessage}` +
      `\n  Details:` +
      `\n    Validation Error Type: ${validationErrorType}.` +
      `\n    Offending Object: '${offendingObjectName}'.` +
      `\n    Offending Field Name: '${offendingFieldName}'` +
      `\n    Offending Field Value: '${offendingFieldValue}'.`;
    super(message);
  }
}

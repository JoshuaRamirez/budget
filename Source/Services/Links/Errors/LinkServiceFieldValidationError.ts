import { LinkServiceValidationErrorType } from "../Validation/Messages/LinkServiceValidationErrorType";

export class LinkServiceFieldValidationError extends Error {
  public constructor(
    offendingObjectName: string,
    offendingFieldName: string,
    offendingFieldValue: string,
    validationErrorMessage: string,
    validationErrorType: LinkServiceValidationErrorType,
  ) {
    if (!offendingObjectName || !offendingObjectName.length) {
      throw new Error("This class must be constructed with a valid 'offendingObjectName' value.");
    }
    if (!offendingFieldName || !offendingFieldName.length) {
      throw new Error("This class must be constructed with a valid 'offendingPropertyName' value.");
    }
    if (validationErrorType !== LinkServiceValidationErrorType.InvalidFieldValue && (offendingFieldValue === undefined)) {
      throw new Error("This class must be constructed with a valid 'offendingFieldValue' value.");
    }
    if (!validationErrorMessage || !validationErrorMessage.length) {
      throw new Error("This class must be constructed with a valid 'validationErrorMessage' value.");
    }
    if (!validationErrorType || !validationErrorType.toString().length) {
      throw new Error("This class must be constructed with a valid 'validationErrorType' value.");
    }
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

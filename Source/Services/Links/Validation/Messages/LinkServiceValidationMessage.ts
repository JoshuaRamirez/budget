import { MessageToken } from "./MessageToken";

export class LinkServiceValidationMessage {
  public static FieldMissing: string = "The {" + MessageToken.FieldName + "} field on the {" + MessageToken.ObjectName + "} object is missing.";
  public static FieldValueMissing: string = "The {" + MessageToken.FieldName + "} field exists on the {" + MessageToken.ObjectName + "} object but the value is missing or invalid.";
}

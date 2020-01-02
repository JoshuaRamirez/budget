import { Event} from "../../../../Events/Core/Event";
import { Projection } from "../../../../Projections/Core/Projection";
import { IDeclaration } from "../../Core/IDeclaration";
import { IMultiTargetEventFields } from "../../Core/IMultiTargetEventFields";
import { ISingleTargetEventFields } from "../../Core/ISingleTargetEventFields";
import { LinkManyToManyDeclaration } from "../../Core/LinkManyToManyDeclaration";
import { LinkManyToOneDeclaration } from "../../Core/LinkManyToOneDeclaration";
import { LinkOneToOneDeclaration } from "../../Core/LinkOneToOneDeclaration";
import { LinkServiceFieldValidator } from "./LinkServiceFieldValidator";

export class LinkServiceEventValidator<TEvent extends Event, TSubjectProjection extends Projection> extends LinkServiceFieldValidator<TEvent> {
  private readonly event: TEvent;
  private readonly declaration: IDeclaration<TEvent>;
  public constructor(declaration: IDeclaration<TEvent>, event: TEvent) {
    super();
    this.event = event;
    this.declaration = declaration;
  }
  public Validate() {
    const event = this.event;
    const declaration = this.declaration;
    this.scalarFieldIsValid(event, declaration.SubjectIdFieldName.toString());
    if (this.declaration instanceof LinkOneToOneDeclaration) {
      const singleTargetFields = (declaration as unknown as ISingleTargetEventFields<TEvent>);
      this.scalarFieldIsValid(event,  singleTargetFields.TargetIdFieldName.toString());
    }
    if (this.declaration instanceof LinkManyToOneDeclaration) {
      const singleTargetFields = (declaration as unknown as ISingleTargetEventFields<TEvent>);
      this.scalarFieldIsValid(event,  singleTargetFields.TargetIdFieldName.toString());
    }
    if (this.declaration instanceof LinkManyToManyDeclaration) {
      const multiTargetEventFields = (declaration as unknown as IMultiTargetEventFields<TSubjectProjection>);
      this.arrayFieldIsValid(event, multiTargetEventFields.SubjectTargetIdsFieldName.toString());
    }
  }
  private arrayFieldIsValid(event: Event, fieldName: string) {
    super.fieldExists(event, fieldName);
    super.fieldIsArray(event, fieldName);
  }
  private scalarFieldIsValid(event: Event, fieldName: string) {
    super.fieldExists(event, fieldName);
    super.fieldIsScalar(event, fieldName);
  }
}

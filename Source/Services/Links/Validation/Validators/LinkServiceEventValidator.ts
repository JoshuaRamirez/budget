import { Event } from "../../../../Events/Core/Event";
import { Projection } from "../../../../Projections/Core/Projection";
import { IDeclaration } from "../../Core/IDeclaration";
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
  }
  private scalarFieldIsValid(event: Event, fieldName: string) {
    super.fieldExists(event, fieldName);
    super.fieldIsScalar(event, fieldName);
  }
}

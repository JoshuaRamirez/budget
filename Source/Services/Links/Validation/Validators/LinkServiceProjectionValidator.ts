import { Event} from "../../../../Events/Core/Event";
import { Projection } from "../../../../Projections/Core/Projection";
import { IDeclaration } from "../../Core/IDeclaration";
import { LinkManyToManyDeclaration } from "../../Core/LinkManyToManyDeclaration";
import { LinkManyToOneDeclaration } from "../../Core/LinkManyToOneDeclaration";
import { LinkOneToOneDeclaration } from "../../Core/LinkOneToOneDeclaration";
import { LinkServiceFieldValidator } from "./LinkServiceFieldValidator";

export class LinkServiceProjectionValidator<TEvent extends Event, TSubjectProjection extends Projection, TTargetProjection extends Projection> extends LinkServiceFieldValidator<TEvent> {
  private readonly event: TEvent;
  private readonly declaration: IDeclaration<TEvent>;
  private readonly subjectProjection: Projection;
  private readonly targetProjection: Projection;
  public constructor(declaration: IDeclaration<TEvent>, event: TEvent, subjectProjection: TSubjectProjection, targetProjection: TTargetProjection) {
    super();
    this.event = event;
    this.declaration = declaration;
    this.subjectProjection = subjectProjection;
    this.targetProjection = targetProjection;
  }
  public Validate() {
    if (this.declaration instanceof LinkManyToManyDeclaration) {
      const fields = (this.declaration as unknown as LinkManyToManyDeclaration<TEvent, TSubjectProjection, TTargetProjection>);
      this.arrayFieldIsValid(this.subjectProjection, fields.SubjectTargetIdsFieldName.toString());
      this.arrayFieldIsValid(this.targetProjection, fields.TargetSubjectIdsFieldName.toString());
    }
    if (this.declaration instanceof LinkManyToOneDeclaration) {
      const fields = (this.declaration as unknown as LinkManyToOneDeclaration<TEvent, TSubjectProjection, TTargetProjection>);
      this.scalarFieldIsValid(this.subjectProjection, fields.SubjectTargetIdFieldName.toString());
      this.arrayFieldIsValid(this.targetProjection, fields.TargetSubjectIdsFieldName.toString());
    }
    if (this.declaration instanceof LinkOneToOneDeclaration) {
      const fields = (this.declaration as unknown as LinkOneToOneDeclaration<TEvent, TSubjectProjection, TTargetProjection>);
      this.scalarFieldIsValid(this.subjectProjection, fields.SubjectTargetIdFieldName.toString());
      this.scalarFieldIsValid(this.targetProjection, fields.TargetSubjectIdFieldName.toString());
    }
  }
  private arrayFieldIsValid(projection: Projection, fieldName: string) {
    super.fieldExists(projection, fieldName);
    super.fieldIsArray(projection, fieldName);
  }
  private scalarFieldIsValid(projection: Projection, fieldName: string) {
    super.fieldExists(projection, fieldName);
  }
}

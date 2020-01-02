import { Event} from "../../../../Events/Core/Event";
import { Projection } from "../../../../Projections/Core/Projection";
import { IDeclaration } from "../../Core/IDeclaration";
import { LinkManySubjectsToManyTargetsDeclaration } from "../../Core/LinkManySubjectsToManyTargetsDeclaration";
import { LinkManySubjectsToOneTargetDeclaration } from "../../Core/LinkManySubjectsToOneTargetDeclaration";
import { LinkOneSubjectToOneTargetDeclaration } from "../../Core/LinkOneSubjectToOneTargetDeclaration";
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
    if (this.declaration instanceof LinkManySubjectsToManyTargetsDeclaration) {
      const fields = (this.declaration as unknown as LinkManySubjectsToManyTargetsDeclaration<TEvent, TSubjectProjection, TTargetProjection>);
      this.arrayFieldIsValid(this.subjectProjection, fields.SubjectTargetIdsFieldName.toString());
      this.arrayFieldIsValid(this.targetProjection, fields.TargetSubjectIdsFieldName.toString());
    }
    if (this.declaration instanceof LinkManySubjectsToOneTargetDeclaration) {
      const fields = (this.declaration as unknown as LinkManySubjectsToOneTargetDeclaration<TEvent, TSubjectProjection, TTargetProjection>);
      this.scalarFieldIsValid(this.subjectProjection, fields.SubjectTargetIdFieldName.toString());
      this.arrayFieldIsValid(this.targetProjection, fields.TargetSubjectIdsFieldName.toString());
    }
    if (this.declaration instanceof LinkOneSubjectToOneTargetDeclaration) {
      const fields = (this.declaration as unknown as LinkOneSubjectToOneTargetDeclaration<TEvent, TSubjectProjection, TTargetProjection>);
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

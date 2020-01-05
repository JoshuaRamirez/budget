import { Event } from "../../../../Events/Core/Event";
import { Projection } from "../../../../Projections/Core/Projection";
import { IDeclaration } from "../../Core/IDeclaration";
import { ILinkManySubjectsToManyTargetsDeclaration } from "../../Core/ILinkManySubjectsToManyTargetsDeclaration";
import { ILinkManySubjectsToOneTargetDeclaration } from "../../Core/ILinkManySubjectsToOneTargetDeclaration";
import { ILinkOneSubjectToOneTargetDeclaration } from "../../Core/ILinkOneSubjectToOneTargetDeclaration";
import { LinkManySubjectsToManyTargetsDeclaration } from "../../Core/LinkManySubjectsToManyTargetsDeclaration";
import { LinkManySubjectsToOneTargetDeclaration } from "../../Core/LinkManySubjectsToOneTargetDeclaration";
import { LinkOneSubjectToOneTargetDeclaration } from "../../Core/LinkOneSubjectToOneTargetDeclaration";
import { LinkServiceFieldValidator } from "./LinkServiceFieldValidator";

export class LinkServiceDeclarationValidator<TEvent extends Event, TSubjectProjection extends Projection, TTargetProjection extends Projection> extends LinkServiceFieldValidator<TEvent> {
  private readonly declaration: IDeclaration<TEvent>;
  public constructor(declaration: IDeclaration<TEvent>) {
    super();
    this.declaration = declaration;
  }
  public Validate() {
    const declaration = this.declaration;
    this.scalarFieldIsValid(declaration, "EventType");
    this.scalarFieldIsValid(declaration, "SubjectType");
    this.scalarFieldIsValid(declaration, "SubjectIdFieldName");
    this.scalarFieldIsValid(declaration, "TargetType");
    if (this.declaration instanceof LinkOneSubjectToOneTargetDeclaration) {
      const oneToOneDeclaration = declaration as ILinkOneSubjectToOneTargetDeclaration<TEvent, TSubjectProjection, TTargetProjection>;
      this.oneToOneFieldIsValid(oneToOneDeclaration, "SubjectTargetIdFieldName");
      this.oneToOneFieldIsValid(oneToOneDeclaration, "TargetSubjectIdFieldName");
    }
    if (this.declaration instanceof LinkManySubjectsToOneTargetDeclaration) {
      const manyToOneDeclaration = declaration as ILinkManySubjectsToOneTargetDeclaration<TEvent, TSubjectProjection, TTargetProjection>;
      this.manyToOneFieldIsValid(manyToOneDeclaration, "SubjectTargetIdFieldName");
      this.manyToOneFieldIsValid(manyToOneDeclaration, "TargetSubjectIdsFieldName");
    }
    if (this.declaration instanceof LinkManySubjectsToManyTargetsDeclaration) {
      const manyToManyDeclaration = declaration as ILinkManySubjectsToManyTargetsDeclaration<TEvent, TSubjectProjection, TTargetProjection>;
      this.manyToManyFieldIsValid(manyToManyDeclaration, "SubjectTargetIdsFieldName");
      this.manyToManyFieldIsValid(manyToManyDeclaration, "TargetSubjectIdsFieldName");
    }
  }
  private oneToOneFieldIsValid<TKey extends keyof ILinkOneSubjectToOneTargetDeclaration<TEvent, TSubjectProjection, TTargetProjection>>(
    declaration: ILinkOneSubjectToOneTargetDeclaration<TEvent, TSubjectProjection, TTargetProjection>,
    fieldName: TKey
  ) {
    this.scalarFieldIsValid(declaration, fieldName.toString());
  }
  private manyToOneFieldIsValid<TKey extends keyof ILinkManySubjectsToOneTargetDeclaration<TEvent, TSubjectProjection, TTargetProjection>>(
    declaration: ILinkManySubjectsToOneTargetDeclaration<TEvent, TSubjectProjection, TTargetProjection>,
    fieldName: TKey
  ) {
    this.scalarFieldIsValid(declaration, fieldName.toString());
  }
  private manyToManyFieldIsValid<TKey extends keyof ILinkManySubjectsToManyTargetsDeclaration<TEvent, TSubjectProjection, TTargetProjection>>(
    declaration: ILinkManySubjectsToManyTargetsDeclaration<TEvent, TSubjectProjection, TTargetProjection>,
    fieldName: TKey
  ) {
    this.scalarFieldIsValid(declaration, fieldName.toString());
  }
  private scalarFieldIsValid(declaration: IDeclaration<TEvent>, fieldName: string) {
    super.fieldExists(declaration, fieldName);
    super.fieldIsScalar(declaration, fieldName);
  }
}

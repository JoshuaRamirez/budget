import { Event } from "../../../../Events/Core/Event";
import { Projection } from "../../../../Projections/Core/Projection";
import { IDeclaration } from "../../Core/IDeclaration";
import { ILinkManyToManyDeclaration } from "../../Core/ILinkManyToManyDeclaration";
import { ILinkManyToOneDeclaration } from "../../Core/ILinkManyToOneDeclaration";
import { ILinkOneToOneDeclaration } from "../../Core/ILinkOneToOneDeclaration";
import { LinkManyToManyDeclaration } from "../../Core/LinkManyToManyDeclaration";
import { LinkManyToOneDeclaration } from "../../Core/LinkManyToOneDeclaration";
import { LinkOneToOneDeclaration } from "../../Core/LinkOneToOneDeclaration";
import { LinkServiceFieldValidator } from "./LinkServiceFieldValidator";

export class LinkServiceDeclarationValidator<TEvent extends Event, TSubjectProjection extends Projection, TTargetProjection extends Projection> extends LinkServiceFieldValidator<TEvent>  {
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
    if (this.declaration instanceof LinkOneToOneDeclaration) {
      const oneToOneDeclaration = (declaration as ILinkOneToOneDeclaration<TEvent, TTargetProjection>);
      this.oneToOneFieldIsValid(oneToOneDeclaration, "TargetIdFieldName");
    }
    if (this.declaration instanceof LinkManyToOneDeclaration) {
      const manyToOneDeclaration = (declaration as ILinkManyToOneDeclaration<TEvent, TTargetProjection>);
      this.manyToOneFieldIsValid(manyToOneDeclaration, "TargetIdFieldName");
      this.manyToOneFieldIsValid(manyToOneDeclaration, "TargetSubjectIdsFieldName");
    }
    if (this.declaration instanceof LinkManyToManyDeclaration) {
      const manyToManyDeclaration = (declaration as ILinkManyToManyDeclaration<TEvent, TSubjectProjection, TTargetProjection>);
      this.manyToManyFieldIsValid(manyToManyDeclaration, "SubjectTargetIdsFieldName");
      this.manyToManyFieldIsValid(manyToManyDeclaration, "TargetSubjectIdsFieldName");
      this.manyToManyFieldIsValid(manyToManyDeclaration, "SubjectTargetIdsFieldName");
    }
  }
  private oneToOneFieldIsValid<TKey extends keyof ILinkOneToOneDeclaration<TEvent, TTargetProjection>>(declaration: ILinkOneToOneDeclaration<TEvent, TTargetProjection>, fieldName: TKey) {
    this.scalarFieldIsValid(declaration, fieldName.toString());
  }
  private manyToOneFieldIsValid<TKey extends keyof ILinkManyToOneDeclaration<TEvent, TTargetProjection>>(declaration: ILinkManyToOneDeclaration<TEvent, TTargetProjection>, fieldName: TKey) {
    this.scalarFieldIsValid(declaration, fieldName.toString());
  }
  private manyToManyFieldIsValid<TKey extends keyof ILinkManyToManyDeclaration<TEvent, TSubjectProjection, TTargetProjection>>(declaration: ILinkManyToManyDeclaration<TEvent, TSubjectProjection, TTargetProjection>, fieldName: TKey) {
    this.scalarFieldIsValid(declaration, fieldName.toString());
  }
  private scalarFieldIsValid(declaration: IDeclaration<TEvent>, fieldName: string) {
    super.fieldExists(declaration, fieldName);
    super.fieldIsScalar(declaration, fieldName);
  }
}

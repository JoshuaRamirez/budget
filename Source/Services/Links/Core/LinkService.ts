import { Event } from "../../../Events/Core/Event";
import { Projection } from "../../../Projections/Core/Projection";
import { ProjectionStore } from "../../../Projections/Core/ProjectionStore";
import { Handler } from "../../Core/Handler";
import { LinkServiceEventValidator } from "../Validation/Validators/LinkServiceEventValidator";
import { LinkServiceProjectionValidator } from "../Validation/Validators/LinkServiceProjectionValidator";
import { IDeclaration } from "./IDeclaration";
import { IMultiSubjectEventFields } from "./IMultiSubjectEventFields";
import { IMultiTargetEventFields } from "./IMultiTargetEventFields";
import { ISingleSubjectEventFields } from "./ISingleSubjectEventFields";
import { ISingleTargetEventFields } from "./ISingleTargetEventFields";

// TODO: Find a way to remove these Generic Type Params and use something else to determine multi/single logic.
export abstract class LinkService
<
  TEvent extends Event,
  TSubjectProjection extends Projection,
  TTargetProjection extends Projection
>
extends Handler<TEvent> {
  private readonly declaration: IDeclaration<TEvent>;
  protected constructor(declaration: IDeclaration<TEvent>) {
    if (!declaration) {
      throw new Error("Missing object instance in the provided Declaration.");
    }
    super(declaration.EventType);
    this.declaration = declaration;
  }
  public Handle(event: TEvent): void {
    const linkServiceEventValidator = new LinkServiceEventValidator<TEvent, TSubjectProjection>(this.declaration, event);
    linkServiceEventValidator.Validate();
    const subjectProjection = ProjectionStore.Instance.GetProjection(this.declaration.SubjectType, event[this.declaration.SubjectIdFieldName.toString()]);
    const targetIds = [];
    if (this.isISingleTargetField(this.declaration)) {
      const fieldName = this.declaration.SubjectTargetIdFieldName.toString();
      targetIds.push(subjectProjection[fieldName]);
    }
    if (this.isIMultiTargetField(this.declaration)) {
      const fieldName = this.declaration.SubjectTargetIdsFieldName.toString();
      targetIds.concat(...subjectProjection[fieldName]);
    }
    targetIds.forEach((targetId) => {
      const target = ProjectionStore.Instance.GetProjection(this.declaration.TargetType, targetId);
      const linkServiceProjectionValidator = new LinkServiceProjectionValidator(this.declaration, event, subjectProjection, target);
      linkServiceProjectionValidator.Validate();
      if (this.isISingleSubjectField(this.declaration)) {
        const fieldName = this.declaration.TargetSubjectIdFieldName.toString();
        target[fieldName] = subjectProjection.Id;
      }
      if (this.isIMultiSubjectProjectionField(this.declaration)) {
        const fieldName = this.declaration.TargetSubjectIdsFieldName.toString();
        target[fieldName].push(subjectProjection.Id);
      }
      target.Update();
    });
  }
  private isISingleSubjectField(declaration: ISingleSubjectEventFields<TTargetProjection> | object):
  declaration is ISingleSubjectEventFields<TTargetProjection> {
    return (declaration as ISingleSubjectEventFields<TTargetProjection>).TargetSubjectIdFieldName !== undefined;
  }
  private isIMultiSubjectProjectionField(declaration: IMultiSubjectEventFields<TTargetProjection> | object):
  declaration is IMultiSubjectEventFields<TTargetProjection> {
    return (declaration as IMultiSubjectEventFields<TTargetProjection>).TargetSubjectIdsFieldName !== undefined;
  }
  private isISingleTargetField(declaration: ISingleTargetEventFields<TSubjectProjection> | object):
  declaration is ISingleTargetEventFields<TSubjectProjection> {
    return (declaration as ISingleTargetEventFields<TSubjectProjection>).SubjectTargetIdFieldName !== undefined;
  }
  private isIMultiTargetField(declaration: IMultiTargetEventFields<TSubjectProjection>| object):
  declaration is IMultiTargetEventFields<TSubjectProjection> {
    return (declaration as IMultiTargetEventFields<TSubjectProjection>).SubjectTargetIdsFieldName !== undefined;
  }
}

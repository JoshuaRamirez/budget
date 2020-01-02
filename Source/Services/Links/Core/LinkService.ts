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
export abstract class LinkService<TSubscribingEvent extends Event, TSubjectProjection extends Projection, TTargetProjection extends Projection> extends Handler<TSubscribingEvent> {
  private readonly declaration: IDeclaration<TSubscribingEvent>;
  protected constructor(declaration: IDeclaration<TSubscribingEvent>) {
    if (!declaration) {
      throw new Error("Missing object instance in the provided Declaration.");
    }
    super(declaration.EventType);
    this.declaration = declaration;
  }
  public Handle(event: TSubscribingEvent): void {
    const linkServiceEventValidator = new LinkServiceEventValidator<TSubscribingEvent, TSubjectProjection>(this.declaration, event);
    linkServiceEventValidator.Validate();
    const subject = ProjectionStore.Instance.GetProjection(this.declaration.SubjectType, event[this.declaration.SubjectIdFieldName.toString()]);
    const targetIds = [];
    if (this.isISingleTargetEventFields(this.declaration)) {
      targetIds.push(event[this.declaration.TargetIdFieldName.toString()]);
    }
    if (this.isIMultiTargetEventFields(this.declaration)) {
      targetIds.concat(...event[this.declaration.SubjectTargetIdsFieldName.toString()]);
    }
    targetIds.forEach((targetId) => {
      const target = ProjectionStore.Instance.GetProjection(this.declaration.TargetType, targetId);
      const linkServiceProjectionValidator = new LinkServiceProjectionValidator(this.declaration, event, subject, target);
      linkServiceProjectionValidator.Validate();
      if (this.isISingleSubjectEventFields(this.declaration)) {
        target[this.declaration.TargetSubjectIdFieldName.toString()] = subject.Id;
      }
      if (this.isIMultiSubjectEventFields(this.declaration)) {
        target[this.declaration.TargetSubjectIdsFieldName.toString()].push(subject.Id);
      }
      target.Update();
    });
  }
  private isISingleSubjectEventFields(declaration: ISingleSubjectEventFields<TTargetProjection> | object): declaration is ISingleSubjectEventFields<TTargetProjection> {
    return (declaration as ISingleSubjectEventFields<TTargetProjection>).TargetSubjectIdFieldName !== undefined;
  }
  private isIMultiSubjectEventFields(declaration: IMultiSubjectEventFields<TTargetProjection> | object): declaration is IMultiSubjectEventFields<TTargetProjection> {
    return (declaration as IMultiSubjectEventFields<TTargetProjection>).TargetSubjectIdsFieldName !== undefined;
  }
  private isISingleTargetEventFields(declaration: ISingleTargetEventFields<TSubscribingEvent> | object): declaration is ISingleTargetEventFields<TSubscribingEvent> {
    return (declaration as ISingleTargetEventFields<TSubscribingEvent>).TargetIdFieldName !== undefined;
  }
  private isIMultiTargetEventFields(declaration: IMultiTargetEventFields<TSubjectProjection>| object): declaration is IMultiTargetEventFields<TSubjectProjection> {
    return (declaration as IMultiTargetEventFields<TSubjectProjection>).SubjectTargetIdsFieldName !== undefined;
  }
}

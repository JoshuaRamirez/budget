import { Event } from "../../../Events/Core/Event";
import { ProjectionStore } from "../../../Projections/Core/ProjectionStore";
import { Handler } from "../../Core/Handler";
import { LinkServiceEventValidator } from "../Validation/Validators/LinkServiceEventValidator";
import { LinkServiceProjectionValidator } from "../Validation/Validators/LinkServiceProjectionValidator";
import { IDeclaration } from "./IDeclaration";
import { IMultiSubjectEventFields } from "./IMultiSubjectEventFields";
import { IMultiTargetEventFields } from "./IMultiTargetEventFields";
import { ISingleSubjectEventFields } from "./ISingleSubjectEventFields";
import { ISingleTargetEventFields } from "./ISingleTargetEventFields";

function isISingleSubjectEventFields(declaration: ISingleSubjectEventFields | object): declaration is ISingleSubjectEventFields {
  return (declaration as ISingleSubjectEventFields).TargetSubjectIdFieldName !== undefined;
}
function isIMultiSubjectEventFields(declaration: IMultiSubjectEventFields | object): declaration is IMultiSubjectEventFields {
  return (declaration as IMultiSubjectEventFields).TargetSubjectIdsFieldName !== undefined;
}
function isISingleTargetEventFields(declaration: ISingleTargetEventFields | object): declaration is ISingleTargetEventFields {
  return (declaration as ISingleTargetEventFields).TargetIdFieldName !== undefined;
}
function isIMultiTargetEventFields(declaration: IMultiTargetEventFields | object): declaration is IMultiTargetEventFields {
  return (declaration as IMultiTargetEventFields).SubjectTargetIdsFieldName !== undefined;
}

export abstract class LinkService<TSubscribingEvent extends Event> extends Handler<TSubscribingEvent> {
  private readonly declaration: IDeclaration;
  protected constructor(declaration: IDeclaration) {
    if (!declaration) {
      throw new Error("Missing object instance in the provided Declaration.");
    }
    super(declaration.EventType);
    this.declaration = declaration;
  }
  public Handle(event: TSubscribingEvent): void {
    const linkServiceEventValidator = new LinkServiceEventValidator<TSubscribingEvent>(this.declaration, event);
    linkServiceEventValidator.Validate();
    const subject = ProjectionStore.Instance.GetProjection(this.declaration.SubjectType, event[this.declaration.TriggeringSubjectIdFieldName]);
    const targetIds = [];
    if (isISingleTargetEventFields(this.declaration)) {
      targetIds.push(event[this.declaration.TargetIdFieldName]);
    }
    if (isIMultiTargetEventFields(this.declaration)) {
      targetIds.concat(...event[this.declaration.SubjectTargetIdsFieldName]);
    }
    targetIds.forEach((targetId) => {
      const target = ProjectionStore.Instance.GetProjection(this.declaration.TargetType, targetId);
      const linkServiceProjectionValidator = new LinkServiceProjectionValidator(this.declaration, event, subject, target);
      linkServiceProjectionValidator.Validate();
      if (isISingleSubjectEventFields(this.declaration)) {
        target[this.declaration.TargetSubjectIdFieldName] = subject.Id;
      }
      if (isIMultiSubjectEventFields(this.declaration)) {
        target[this.declaration.TargetSubjectIdsFieldName].push(subject.Id);
      }
      target.Update();
    });
  }
}

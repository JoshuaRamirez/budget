import { Event } from "../../../Events/Core/Event";
import { Projection } from "../../../Projections/Core/Projection";
import { ProjectionStore } from "../../../Projections/Core/ProjectionStore";
import { Receiver } from "../../Core/Receiver";
import { LinkServiceEventValidator } from "../Validation/Validators/LinkServiceEventValidator";
import { LinkServiceProjectionValidator } from "../Validation/Validators/LinkServiceProjectionValidator";
import { IDeclaration } from "./IDeclaration";
import { IMultiSubjectField } from "./IMultiSubjectField";
import { IMultiTargetField } from "./IMultiTargetField";
import { ISingleSubjectField } from "./ISingleSubjectField";
import { ISingleTargetField } from "./ISingleTargetField";

// TODO: Find a way to remove these Generic Type Params and use something else to determine multi/single logic.
export abstract class LinkService<TEvent extends Event, TSubjectProjection extends Projection, TTargetProjection extends Projection> extends Receiver<TEvent> {
  private readonly declaration: IDeclaration<TEvent>;
  protected constructor(declaration: IDeclaration<TEvent>) {
    if (!declaration) {
      throw new Error("Missing object instance in the provided Declaration.");
    }
    super(declaration.EventType);
    this.declaration = declaration;
  }
  public Receive(event: TEvent): void {
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
    targetIds.forEach(targetId => {
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
  private isISingleSubjectField(declaration: ISingleSubjectField<TTargetProjection> | object): declaration is ISingleSubjectField<TTargetProjection> {
    return (declaration as ISingleSubjectField<TTargetProjection>).TargetSubjectIdFieldName !== undefined;
  }
  private isIMultiSubjectProjectionField(declaration: IMultiSubjectField<TTargetProjection> | object): declaration is IMultiSubjectField<TTargetProjection> {
    return (declaration as IMultiSubjectField<TTargetProjection>).TargetSubjectIdsFieldName !== undefined;
  }
  private isISingleTargetField(declaration: ISingleTargetField<TSubjectProjection> | object): declaration is ISingleTargetField<TSubjectProjection> {
    return (declaration as ISingleTargetField<TSubjectProjection>).SubjectTargetIdFieldName !== undefined;
  }
  private isIMultiTargetField(declaration: IMultiTargetField<TSubjectProjection> | object): declaration is IMultiTargetField<TSubjectProjection> {
    return (declaration as IMultiTargetField<TSubjectProjection>).SubjectTargetIdsFieldName !== undefined;
  }
}

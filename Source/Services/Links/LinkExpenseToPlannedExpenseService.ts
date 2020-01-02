import { ExpenseCreatedEvent } from "../../Events/ExpenseCreatedEvent";
import { ExpenseProjection } from "../../Projections/ExpenseProjection";
import { PlannedExpenseProjection } from "../../Projections/PlannedExpenseProjection";
import { LinkManySubjectsToOneTargetDeclaration } from "./Core/LinkManySubjectsToOneTargetDeclaration";
import { LinkService } from "./Core/LinkService";

export class LinkExpenseToPlannedExpenseService
extends LinkService<ExpenseCreatedEvent, ExpenseProjection, PlannedExpenseProjection> {
  public static Instance = new LinkExpenseToPlannedExpenseService();
  private constructor() {
    const declaration = new
    LinkManySubjectsToOneTargetDeclaration<ExpenseCreatedEvent, ExpenseProjection, PlannedExpenseProjection>
    ({
      EventType: ExpenseCreatedEvent,
      SubjectIdFieldName: "ExpenseId",
      SubjectTargetIdFieldName: "PlannedExpenseId",
      SubjectType: ExpenseProjection,
      TargetSubjectIdsFieldName: "ExpenseIds",
      TargetType: PlannedExpenseProjection,
    });
    super(declaration);
  }
  public Handle(event: ExpenseCreatedEvent): void {
    super.Handle(event);
  }
}

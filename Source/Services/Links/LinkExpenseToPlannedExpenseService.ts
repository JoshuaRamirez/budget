import { ExpenseCreatedEvent } from "../../Events/ExpenseCreatedEvent";
import { ExpenseProjection } from "../../Projections/ExpenseProjection";
import { PlannedExpenseProjection } from "../../Projections/PlannedExpenseProjection";
import { LinkManyToOneDeclaration } from "./Core/LinkManyToOneDeclaration";
import { LinkService } from "./Core/LinkService";

export class LinkExpenseToPlannedExpenseService extends LinkService<ExpenseCreatedEvent> {
  public static Instance = new LinkExpenseToPlannedExpenseService();
  private constructor() {
    const declaration = new LinkManyToOneDeclaration({
      EventType: ExpenseCreatedEvent,
      SubjectIdFieldName: "ExpenseId",
      SubjectType: ExpenseProjection,
      TargetIdFieldName: "PlannedExpenseId",
      TargetSubjectIdsFieldName: "ExpenseIds",
      TargetType: PlannedExpenseProjection,
    });
    super(declaration);
  }
  public Handle(event: ExpenseCreatedEvent): void {
    super.Handle(event);
  }
}

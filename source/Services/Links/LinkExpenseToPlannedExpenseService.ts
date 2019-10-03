import { LinkManyToOneService } from "../../Core/LinkManyToOneService";
import { ExpenseCreatedEvent } from "../../Events/ExpenseCreatedEvent";
import { ExpenseProjection } from "../../Projections/ExpenseProjection";
import { PlannedExpenseProjection } from "../../Projections/PlannedExpenseProjection";

export class LinkExpenseToPlannedExpenseService extends LinkManyToOneService<ExpenseCreatedEvent> {
  public static Instance = new LinkExpenseToPlannedExpenseService();
  private constructor() {
    super(
      {
        EventType: ExpenseCreatedEvent,
        SubjectAggregationFieldName: "ExpenseIds",
        SubjectIdFieldName: "ExpenseId",
        SubjectType: ExpenseProjection,
        TargetIdFieldName: "PlannedExpenseId",
        TargetType: PlannedExpenseProjection,
      },
    );
  }
}

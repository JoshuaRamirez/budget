import { ExpenseCreatedEvent } from "../../Events/ExpenseCreatedEvent";
import { ExpenseProjection } from "../../Projections/ExpenseProjection";
import { PayeeProjection } from "../../Projections/PayeeProjection";
import { LinkManyToOneDeclaration } from "./Core/LinkManyToOneDeclaration";
import { LinkService } from "./Core/LinkService";

export class LinkExpenseToPayeeService extends LinkService<ExpenseCreatedEvent> {
  public static Instance: LinkExpenseToPayeeService = new LinkExpenseToPayeeService();
  private constructor() {
    const declaration = new LinkManyToOneDeclaration({
      EventType: ExpenseCreatedEvent,
      SubjectType: ExpenseProjection,
      TargetIdFieldName: "PayeeId",
      TargetSubjectIdsFieldName: "ExpenseIds",
      TargetType: PayeeProjection,
      TriggeringSubjectIdFieldName: "ExpenseId",
    });
    super(declaration);
  }
  public Handle(event: ExpenseCreatedEvent): void {
    super.Handle(event);
  }
}

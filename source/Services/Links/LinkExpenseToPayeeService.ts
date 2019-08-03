import { LinkManyToOneService } from "../../Core/LinkManyToOneService";
import { ExpenseCreatedEvent } from "../../Events/ExpenseCreatedEvent";
import { ExpenseProjection } from "../../Projections/ExpenseProjection";
import { PayeeProjection } from "../../Projections/PayeeProjection";

export class LinkExpenseToPayeeService extends LinkManyToOneService<ExpenseCreatedEvent> {
  public static Instance: LinkExpenseToPayeeService = new LinkExpenseToPayeeService();
  private constructor() {
    super(
      ExpenseCreatedEvent,
      ExpenseProjection,
      "ExpenseId",
      "ExpenseIds",
      PayeeProjection,
      "PayeeId",
    );
  }
}

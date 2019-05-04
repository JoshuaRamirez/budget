import { Saga } from "../Core/Saga";
import { ExpenseRequestedEvent } from "../Events/ExpenseRequestedEvent";

export class CreateExpenseSaga extends Saga {
  public ExpenseRequestedEvent: ExpenseRequestedEvent;
  constructor() {
    super(CreateExpenseSaga.name);
  }
}

import { MainEvent } from "../Core/MainEvent";

export class PayeeCreatedEvent extends MainEvent<PayeeCreatedEvent> {
  public PayeeName: string;
  public Type: string;
  public TransactionIds: any[] = [];
  constructor() {
    super(PayeeCreatedEvent.name);
  }
}

import { LinkManyToOneService } from "../../Core/LinkManyToOneService";
import { DepositCreatedEvent } from "../../Events/DepositCreatedEvent";
import { DepositProjection } from "../../Projections/DepositProjection";
import { PlannedDepositProjection } from "../../Projections/PlannedDepositProjection";

export class LinkDepositToPlannedDepositService extends LinkManyToOneService<DepositCreatedEvent> {
  public static Instance = new LinkDepositToPlannedDepositService();
  private constructor() {
    super(
      DepositCreatedEvent,
      DepositProjection,
      "DepositId",
      "DepositIds",
      PlannedDepositProjection,
      "PlannedDepositId",
    );
  }
}

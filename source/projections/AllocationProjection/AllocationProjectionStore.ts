class AllocationProjectionStore extends ProjectionStore<AllocationProjection, AllocationProjectionRequest> {
  public Project(contract: AllocationProjectionRequest): AllocationProjection {
    const projection = new AllocationProjection();
    projection.Amount = contract.Amount;
    projection.Id = Date.now();
    projection.LedgerId = contract.LedgerId;
    projection.TransactionId = contract.TransactionId;
    this.Projections.push(projection);
    return projection;
  }

}

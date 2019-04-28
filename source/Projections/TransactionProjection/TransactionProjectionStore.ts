class TransactionProjectionStore extends ProjectionStore<TransactionProjection, TransactionProjectionRequest> {
  public Project(contract: TransactionProjectionRequest): TransactionProjection {
    const projection = new TransactionProjection();
    projection.Amount = contract.Amount;
    projection.Destination = contract.Destination;
    projection.Id = Date.now();
    projection.LedgerId = contract.LedgerId;
    projection.Source = contract.Source;
    projection.Type = contract.Type;
    this.Projections.push(projection);
    return projection;
  }
}

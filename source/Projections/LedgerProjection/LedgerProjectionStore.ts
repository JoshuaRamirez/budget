class LedgerProjectionStore extends ProjectionStore<LedgerProjection, LedgerProjectionRequest> {
  public Project(contract: LedgerProjectionRequest): LedgerProjection {
    const projection = new LedgerProjection();
    projection.Account = contract.Account;
    projection.Id = Date.now();
    projection.Balance = contract.Balance;
    projection.Transactions = contract.Transactions;
    this.Projections.push(projection);
    return projection;
  }

}

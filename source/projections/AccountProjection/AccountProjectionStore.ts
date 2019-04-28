class AccountProjectionStore extends ProjectionStore<AccountProjection, AccountProjectionRequest> {

  public Project(contract: AccountProjectionRequest): AccountProjection {
    const accountProjection = new AccountProjection();
    accountProjection.Id = Date.now();
    accountProjection.Name = contract.Name;
    accountProjection.Type = contract.Type;
    this.Projections.push(accountProjection);
    return accountProjection;
  }

}

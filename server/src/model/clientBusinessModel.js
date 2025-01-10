class ClientBusiness {
  constructor({
    clientBusinessId = null,
    clientId = null,
    businessId = null
  }) {
    this.clientBusinessId = clientBusinessId,
    this.clientId = clientId,
    this.businessId = businessId
  }

  /**
   * Update details.
   * @param {object} updates - Key-value pairs of properties to update.
   */
  update(updates) {
    Object.assign(this, updates);
  }
}

export default ClientBusiness;
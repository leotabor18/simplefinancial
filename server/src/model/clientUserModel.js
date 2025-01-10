class ClientUser {
  constructor({
    clientUserId = null,
    clientId = null,
    userId = null
  }) {
    this.clientUserId = clientUserId,
    this.clientId = clientId,
    this.userId = userId
  }

  /**
   * Update details.
   * @param {object} updates - Key-value pairs of properties to update.
   */
  update(updates) {
    Object.assign(this, updates);
  }
}

export default ClientUser;


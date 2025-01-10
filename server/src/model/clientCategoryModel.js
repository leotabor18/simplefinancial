class ClientCategory {
  constructor({
    clientCategoryId = null,
    clientId = null,
    categoryId = null
  }) {
    this.clientCategoryId = clientCategoryId,
    this.clientId = clientId,
    this.categoryId = categoryId
  }

  /**
   * Update details.
   * @param {object} updates - Key-value pairs of properties to update.
   */
  update(updates) {
    Object.assign(this, updates);
  }
}

export default ClientCategory;
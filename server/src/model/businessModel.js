class Business {
  constructor({
    businessId = null,
    name = null,
    email = null,
    phoneNumber = null,
    streetAddress = null,
    city = null,
    state = null,
    zip = null,
    country = null,
    type = null,
    status = null,
    taxNumber = null,
    whoAdded = null,
    whoUpdated = null,
    whenAdded = null,
    ts = null
  }) {
    this.businessId = businessId,
    this.name = name,
    this.email = email,
    this.phoneNumber = phoneNumber,
    this.streetAddress = streetAddress,
    this.city = city,
    this.state = state,
    this.zip = zip,
    this.country = country,
    this.type = type,
    this.status = status,
    this.taxNumber = taxNumber,
    this.whoAdded = whoAdded,
    this.whoUpdated = whoUpdated,
    this.whenAdded = whenAdded,
    this.ts = ts
  }

  /**
   * Update details.
   * @param {object} updates - Key-value pairs of properties to update.
   */
  update(updates) {
    Object.assign(this, updates);
  }
}

export default Business;
class User {
  constructor({
    userId = '',
    firstName = null,
    lastName = null,
    middleName = null,
    email = null,
    phoneNumber = null,
    status = null,
    role = null,
    whoAdded = null,
    whoUpdated = null,
    whenAdded = null,
    ts,
  }) {
    this.userId = userId
    this.firstName = firstName
    this.lastName = lastName
    this.middleName = middleName
    this.email = email
    this.phoneNumber = phoneNumber
    this.status = status
    this.role = role,
    this.whoAdded = whoAdded
    this.whoUpdated = whoUpdated
    this.whenAdded = whenAdded
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

export default User;

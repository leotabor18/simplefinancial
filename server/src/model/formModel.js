class Form {
  constructor({
    formId = null,
    title = null,
    description = null,
    isResponseAllowed = null,
    whoAdded = null,
    whoUpdated = null,
    whenAdded = null,
    ts
  }) {
    this.formId = formId,
    this.title = title,
    this.description = description,
    this.isResponseAllowed = isResponseAllowed,
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

export default Form;




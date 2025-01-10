class Option {
  constructor({
    optionId = null,
    formItemId = null,
    name = null
  }) {
    this.optionId = optionId,
    this.formItemId = formItemId,
    this.name = name
  }

  /**
   * Update details.
   * @param {object} updates - Key-value pairs of properties to update.
   */
  update(updates) {
    Object.assign(this, updates);
  }
}

export default Option;




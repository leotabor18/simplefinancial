class Submitted {
  constructor({
    submittedId = null,
    taskFormId = null,
    formItemId = null,
    values = null
  }) {
    this.submittedId = submittedId,
    this.taskFormId = taskFormId,
    this.formItemId = formItemId,
    this.values = values
  }

  /**
   * Update details.
   * @param {object} updates - Key-value pairs of properties to update.
   */
  update(updates) {
    Object.assign(this, updates);
  }
}

export default Submitted;




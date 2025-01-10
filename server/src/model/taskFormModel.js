class TaskForm {
  constructor({
    taskFormId = null,
    taskId = null,
    formId = null,
    status = null,
    dateCompleted = null,
    progress = null
  }) {
    this.taskFormId = taskFormId,
    this.taskId = taskId,
    this.formId = formId,
    this.status = status,
    this.dateCompleted = dateCompleted,
    this.progress = progress
  }

  /**
   * Update details.
   * @param {object} updates - Key-value pairs of properties to update.
   */
  update(updates) {
    Object.assign(this, updates);
  }
}

export default TaskForm;




class Task {
  constructor({
    taskId = null,
    clientId = null,
    businessId = null,
    name = null,
    instruction = null,
    dateCompleted = null,
    dueDate = null,
    whoAdded = null,
    whoUpdated = null,
    whenAdded = null,
    ts = null
  }) {
    this.taskId = taskId,
    this.clientId = clientId,
    this.businessId = businessId,
    this.name = name,
    this.instruction = instruction,
    this.dateCompleted = dateCompleted,
    this.dueDate = dueDate,
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

export default Task;




class File {
  constructor({
    fileId = null,
    taskId = null,
    name = null,
    fileUrl = null,
    description = null,
    whoAdded = null,
    whoUpdated = null,
    whenAdded = null,
    ts
  }) {
    this.fileId = fileId,
    this.taskId = taskId,
    this.name = name,
    this.fileUrl = fileUrl,
    this.description = description,
    this.whoAdded = whoAdded,
    this.whoUpdated = whoUpdated,
    this.whenAdded = whenAdded,
    this.t = ts
  }

  /**
   * Update details.
   * @param {object} updates - Key-value pairs of properties to update.
   */
  update(updates) {
    Object.assign(this, updates);
  }
}

export default File;
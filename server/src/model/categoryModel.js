class Category {
  constructor({
    categoryId = null,
    name = null,
    description = null,
    whoAdded = null,
    whoUpdated = null,
    whenAdded = null,
    ts
  }) {
    this.categoryId = categoryId,
    this.name = name,
    this.description = description,
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

export default Category;


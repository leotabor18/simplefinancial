class FormItem {
  constructor({
    formItemId = null,
    formId = null,
    type = null,
    question = null,
    isRequired = null,
    imageUrl = null,
    section = null,
    order = null,
    description = null
  }) {
    this.formItemId = formItemId,
    this.formId = formId,
    this.section = section,
    this.order = order,
    this.type = type,
    this.question = question,
    this.isRequired = isRequired,
    this.imageUrl = imageUrl,
    this.description = description
  }

  /**
   * Update details.
   * @param {object} updates - Key-value pairs of properties to update.
   */
  update(updates) {
    Object.assign(this, updates);
  }
}

export default FormItem;




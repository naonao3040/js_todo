let id = 0;

export class TodoItemModel {
  /** @type {number} id */
  /** @type {string} title */
  /** @type {boolean} completed (完了済み: true、未完了: false) */

  constructor({ title, completed }) {
    this.id = id++;
    this.title = title;
    this.completed = completed;
  }
}

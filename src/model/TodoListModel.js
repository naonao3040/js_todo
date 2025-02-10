import { EventEmitter } from "../EventEmitter.js";

export class TodoListModel extends EventEmitter {
  /**
   * @param {TodoListModel[]} [items] アイテム一覧
   */
  constructor() {
    super();
    this.items = [];
  }

  getTotalCount() {
    return this.items.length;
  }

  getCompletedItemCount() {
    let completedItems = this.items.filter((item) => {
      return item.completed === true;
    });
    return completedItems.length;
  }

  getUncompletedItemCount() {
    let uncompletedItems = this.items.filter((item) => {
      return item.completed === false;
    });
    return uncompletedItems.length;
  }

  getTodoItems() {
    return this.items;
  }

  /**
   * listが更新されたタイミングでイベントを追加する
   * @param {Function} listener
   */
  onChange(listener) {
    this.addEventListener("change", listener);
  }

  /** 状態が変更されたときに登録済みのリスナー関数を呼び出す */
  emitChange() {
    this.emit("change");
  }

  addTodoItem(item) {
    this.items.push(item);
    this.emitChange();
  }

  updateTodoItem({ id, title, completed }) {
    const todoItem = this.items.find((item) => item.id === id);
    todoItem.title = title;
    todoItem.completed = completed;
    this.emitChange();
  }

  deleteTodoItem(id) {
    this.items = this.items.filter((item) => {
      return item.id !== id;
    });
    this.emitChange();
  }
}

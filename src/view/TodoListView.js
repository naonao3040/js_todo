import { element } from "./html-util.js";
import { TodoItemView } from "./TodoItemView.js";

export class TodoListView {
  createElement(items, { onUpdateTodo, onDeleteTodo }) {
    const todoListElemet = element`<ul></ul>`;

    items.forEach((item) => {
      const todoItemView = new TodoItemView();
      const todoItemElement = todoItemView.createElement(item, {
        onUpdateTodo,
        onDeleteTodo,
      });
      todoListElemet.appendChild(todoItemElement);
    });
    return todoListElemet;
  }
}

import { render } from "./view/html-util.js";
import { TodoListModel } from "./model/TodoListModel.js";
import { TodoItemModel } from "./model/TodoItemModel.js";
import { TodoListView } from "./view/TodoListView.js";

export class App {
  #todoList = new TodoListModel();
  #todoListView = new TodoListView();

  handleAdd(title) {
    this.#todoList.addTodoItem(
      new TodoItemModel({
        title,
        completed: false,
      })
    );
  }

  handleUpdate({ id, title, completed }) {
    this.#todoList.updateTodoItem({ id, title, completed });
  }

  handleDelete(id) {
    this.#todoList.deleteTodoItem(id);
  }

  mount() {
    const formElement = document.querySelector("#js-todo-form");
    const inputElement = document.querySelector("#js-todo-form-input");
    const containerElement = document.querySelector("#js-todo-list");
    const todoItemCountElement = document.querySelector("#js-todo-total-count");
    const todoItemCompletedElement = document.querySelector(
      "#js-todo-completed-count"
    );
    const todoItemUncompletedElement = document.querySelector(
      "#js-todo-uncompleted-count"
    );

    this.#todoList.onChange(() => {
      const todoItems = this.#todoList.getTodoItems();

      const todoListElemet = this.#todoListView.createElement(todoItems, {
        onUpdateTodo: ({ id, title, completed }) => {
          this.handleUpdate({ id, title, completed });
        },

        onDeleteTodo: (id) => {
          this.handleDelete(id);
        },
      });

      render(todoListElemet, containerElement);
      // 各タスクの数を表示
      todoItemCountElement.textContent = `Todoアイテム数: ${this.#todoList.getTotalCount()}`;
      todoItemCompletedElement.textContent = `完了済み: ${this.#todoList.getCompletedItemCount()}`;
      todoItemUncompletedElement.textContent = `未完了: ${this.#todoList.getUncompletedItemCount()}`;
    });

    formElement.addEventListener("submit", (event) => {
      event.preventDefault();

      if (inputElement.value === "") {
        alert("タスクを入力してください");
      } else {
        this.handleAdd(inputElement.value);
      }

      inputElement.value = "";
    });
  }
}

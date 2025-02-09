import { element } from "./html-util.js";

export class TodoItemView {
  createElement(item, { onUpdateTodo, onDeleteTodo }) {
    const itemElement = item.completed
      ? element`<li><input type="checkbox" class="checkbox" checked><s>${item.title}</s><button class="edit">編集</button><button class="delete">削除</button></li>`
      : element`<li><input type="checkbox" class="checkbox">${item.title}<button class="edit">編集</button><button class="delete">削除</button></li>`;

    // チェックボックスの処理
    const checkboxElement = itemElement.querySelector(".checkbox");
    checkboxElement.addEventListener("change", () => {
      onUpdateTodo({
        id: item.id,
        title: item.title,
        completed: !item.completed,
      });
    });

    // 削除ボタンの処理
    const deleteButtonElement = itemElement.querySelector(".delete");
    deleteButtonElement.addEventListener("click", () => {
      if (window.confirm("本当に削除してよろしいですか？")) {
        onDeleteTodo(item.id);
      }
    });

    // 編集ボタンの処理
    const editButtonElement = itemElement.querySelector(".edit");
    editButtonElement.addEventListener("click", () => {
      const editInputElement = element`<input type="text" class="edit-todo" value="${item.title}" />`;
      const saveButtonElement = element`<button class="save">保存</button>`;
      itemElement.innerHTML = "";
      itemElement.appendChild(editInputElement);
      itemElement.appendChild(saveButtonElement);

      saveButtonElement.addEventListener("click", () => {
        if (editInputElement.value == "") {
          alert("タスク名を入力してください");
        } else {
          onUpdateTodo({
            id: item.id,
            title: editInputElement.value,
            completed: item.completed,
          });
        }
      });
    });

    return itemElement;
  }
}

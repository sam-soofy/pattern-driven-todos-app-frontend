import { TodoList } from "./classes.js";

const todoList = TodoList.instance;

/**
 * Renders the todo list to the DOM
 * @function
 */
function renderTodoList() {
  DOM.todoList.innerHTML = "";

  todoList.items.forEach((item) => {
    const li = document.createElement("li");
    li.className = "todo-item";

    const span = document.createElement("span");
    span.textContent = item.text;
    span.className = "todo-text";

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.className = "delete-btn btn-danger";
    deleteBtn.dataset.text = item.text;

    li.appendChild(span);
    li.appendChild(deleteBtn);
    DOM.todoList.appendChild(li);
  });
}

export { renderTodoList };

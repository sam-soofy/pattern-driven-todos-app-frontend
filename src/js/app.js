/**
 * @fileoverview Main application entry point and DOM event handlers
 * @module app
 */

import { TodoItem, TodoList } from "./classes.js";

/**
 * Global DOM elements cache
 * @namespace
 * @global
 */
globalThis.DOM = {};
const DOM = globalThis.DOM;

/**
 * Renders the todo list to the DOM
 * @function
 */
function renderTodoList() {
  const todoList = TodoList.instance;
  DOM.todoList.innerHTML = "";

  todoList.items.forEach((item) => {
    const li = document.createElement("li");
    li.className = "flex justify-between items-center p-3 bg-gray-50 rounded-md border border-gray-200";

    const span = document.createElement("span");
    span.textContent = item.text;
    span.className = "text-gray-700 flex-1";

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.className = "delete-btn px-3 py-1 bg-red-500 text-white text-sm rounded hover:bg-red-600 transition-colors";
    deleteBtn.dataset.text = item.text;

    li.appendChild(span);
    li.appendChild(deleteBtn);
    DOM.todoList.appendChild(li);
  });
}

/**
 * Initializes the application when DOM is ready.
 * Sets up event listeners and subscribes to todo list changes.
 * @listens DOMContentLoaded
 */
document.addEventListener("DOMContentLoaded", () => {
  // Cache DOM elements
  /**
   * Input field for new todo items
   * @type {HTMLInputElement}
   */
  DOM.todoInput = document.getElementById("todo-input");
  
  /**
   * Button to add new todo items
   * @type {HTMLButtonElement}
   */
  DOM.addBtn = document.getElementById("add-btn");
  
  /**
   * Unordered list container for todo items
   * @type {HTMLUListElement}
   */
  DOM.todoList = document.getElementById("todo-list");

  const todoList = TodoList.instance;

  // Subscribe to todo list changes (Observer Pattern)
  todoList.add(renderTodoList);

  /**
   * Handles click event on the add button
   * Creates and adds a new TodoItem if input is not empty
   * @param {MouseEvent} event - The click event
   */
  DOM.addBtn.addEventListener("click", (event) => {
    const text = DOM.todoInput.value.trim();
    if (text) {
      const newItem = new TodoItem(text);
      todoList.add(newItem);
      DOM.todoInput.value = "";
    }
  });

  /**
   * Handles click events on the todo list (Event Delegation Pattern)
   * Deletes todo items when delete button is clicked
   * @param {MouseEvent} event - The click event
   */
  DOM.todoList.addEventListener("click", (event) => {
    if (event.target.classList.contains("delete-btn")) {
      const text = event.target.dataset.text;
      const item = todoList.find(text);
      if (item) {
        todoList.delete(item);
      }
    }
  });

  // Initial render
  renderTodoList();
});

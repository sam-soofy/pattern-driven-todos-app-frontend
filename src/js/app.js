"use strict";
/**
 * @fileoverview Main application entry point and DOM event handlers
 * @module app
 */

import { CE, COMMANDS, Command } from "./lib/command.js";
import { LocalStorage } from "./lib/storage.js";
import { TodoItem, TodoList } from "./todo/classes.js";
import { renderTodoList } from "./todo/render.js";

/**
 * Global DOM elements cache
 * @namespace
 * @global
 */
globalThis.DOM = {};
const DOM = globalThis.DOM;

const todoList = TodoList.instance;

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

  /**
   * Handles click event on the add button
   * Creates and adds a new TodoItem if input is not empty
   * @param {MouseEvent} event - The click event
   */
  DOM.addBtn.addEventListener("click", (event) => {
    const text = DOM.todoInput.value.trim();
    if (text) {
      const newItem = new TodoItem(text);
      const result = CE.execute(new Command(COMMANDS.ADD_TODO, newItem));
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
      const result = CE.execute(
        new Command(COMMANDS.REMOVE_TODO_BY_TEXT, text)
      );
    }
  });
});

/**
 * Initializes the application when DOM is ready.
 * Here we deal with loadings and attachments like observers
 * @listens DOMContentLoaded
 */
document.addEventListener("DOMContentLoaded", () => {
  // Subscribe to todo list changes (Observer Pattern)
  todoList.addObserver(renderTodoList);
  LocalStorage.load();
});

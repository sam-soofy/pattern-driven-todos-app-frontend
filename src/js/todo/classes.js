/**
 * @fileoverview Core classes implementing TodoItem (Value Object) and TodoList (Singleton)
 * @module classes
 */

import { observerMixin } from "./mixin.js";

/**
 * Represents a single todo item using the Value Object Pattern.
 * Value Objects are immutable and compared by their value rather than identity.
 *
 * @class
 */
class TodoItem {
  /**
   * Creates a new TodoItem
   * @param {string} text - The text content of the todo item
   */
  constructor(text) {
    /**
     * The text content of the todo item
     * @type {string}
     */
    this.text = text;
  }

  /**
   * Compares this TodoItem with another for equality based on value.
   * Implements Value Object Pattern equality comparison.
   *
   * @param {TodoItem} other - Another TodoItem to compare against
   * @returns {boolean} True if both items have the same text value
   */
  equals(other) {
    return this.text === other.text;
  }
}

/**
 * Manages a collection of TodoItems using the Singleton Pattern.
 * Ensures only one instance exists throughout the application lifecycle.
 * Implements Observer Pattern via mixin for change notifications.
 *
 * @class
 * @mixes observerMixin
 */
class TodoList {
  /**
   * Private data store for todo items
   * @type {Set<TodoItem>}
   * @private
   */
  #data = new Set();

  /**
   * Gets the todo items collection
   * @type {Set<TodoItem>}
   * @readonly
   */
  get items() {
    return [...this.#data];
  }

  /**
   * The single instance of TodoList
   * @type {TodoList|null}
   * @private
   * @static
   */
  static #instance = null;

  /**
   * Static initializer block to create the singleton instance
   * @static
   */
  static {
    TodoList.#instance = new TodoList();
  }

  /**
   * Gets the singleton instance of TodoList
   * @type {TodoList}
   * @static
   * @readonly
   */
  static get instance() {
    return TodoList.#instance;
  }

  /**
   * Private constructor to enforce Singleton Pattern.
   * Throws error if attempted to instantiate more than once.
   * @throws {Error} When attempting to create additional instances
   */
  constructor() {
    if (TodoList.instance !== null)
      throw new Error('Use the class "TodoList.instance" to get the single class instantiation.');
  }

  /**
   * Adds a new todo item to the list and notifies observers
   * Each item (Todo) should be unique (based on value) and if not, it gets ignored
   * @param {TodoItem} item - The TodoItem to add
   * @returns {boolean} True if item was added, false if already exists
   */
  add(item) {
    if (this.exists(item)) return false;
    this.#data.add(item);
    this.notify();
    return true;
  }

  /**
   * Deletes a todo item from the list and notifies observers
   * @param {string} text - The text of the TodoItem to delete
   * @returns {boolean} True if item was deleted, false if not found
   */
  deleteByText(text) {
    const item = this.findByText(text);
    if (!item) return false;

    this.#data.delete(item);
    this.notify();

    return true;
  }

  /**
   * Finds a todo item by its text content
   * @param {string} text - The text to search for
   * @returns {TodoItem|undefined} The found TodoItem or undefined
   */
  findByText(text) {
    return [...this.#data].find((item) => item.text === text);
  }

  /**
   * Checks if a todo item exists in the list
   * @param {TodoItem} item - The TodoItem to check
   * @returns {boolean} True if item exists, false otherwise
   */
  exists(item) {
    return [...this.#data].some((todo) => todo.equals(item));
  }

  /**
   * Replaces the entire todo list with a new collection and notifies observers
   * @param {Set<TodoItem>|Array<TodoItem>} list - New collection of TodoItems
   */
  replaceList(list) {
    this.#data.clear();
    const items = Array.isArray(list) ? list : [...list];
    items.forEach((item) => {
      const todoItem = new TodoItem(item.text, item.completed);
      this.#data.add(todoItem);
    });
    this.notify();
  }
}

// Apply Observer Pattern mixin to TodoList
Object.assign(TodoList.prototype, observerMixin);

// Using setPrototypeOf instead of Object.assign, will set the mixin prototype to upper hand prototype chain
// Avoiding prototype unwanted polymorphisms without overriding of properties
// Object.setPrototypeOf(TodoList.prototype, Object.getPrototypeOf(observerMixin));

export { TodoItem, TodoList };

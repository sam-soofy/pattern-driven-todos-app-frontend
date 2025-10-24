/**
 * @fileoverview Observer Pattern implementation as a mixin
 * @module mixin
 */

/**
 * Set of observer functions, defined in the mixin module to be static
 * Available to all instances of the class that uses this mixin as one single source of value
 * @type {Set<Function>}
 */
const observers = new Set();

/**
 * Mixin that implements the Observer Pattern.
 * Allows objects to maintain a list of observers and notify them of changes.
 *
 * @mixin
 * @example
 * class MyClass {}
 * Object.assign(MyClass.prototype, observerMixin);
 *
 * const instance = new MyClass();
 * instance.add(() => console.log('notified!'));
 * instance.notify(); // logs: 'notified!'
 */
const observerMixin = {
  /**
   * Adds an observer function to the observers set
   * @param {Function} obs - Observer callback function to be notified
   */
  addObserver(obs) {
    observers.add(obs);
  },

  /**
   * Removes an observer function from the observers set
   * @param {Function} obs - Observer callback function to remove
   */
  removeObserver(obs) {
    observers.delete(obs);
  },

  /**
   * Notifies all registered observers by invoking their callback functions
   */
  notify() {
    observers.forEach((obs) => obs());
  },
};

export { observerMixin };

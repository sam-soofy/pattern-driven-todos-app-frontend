/**
 * @fileoverview Observer Pattern implementation as a mixin
 * @module mixin
 */

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
export const observerMixin = {
  /**
   * Set of observer functions
   * @type {Set<Function>}
   */
  observers: new Set(),
  
  /**
   * Adds an observer function to the observers set
   * @param {Function} obs - Observer callback function to be notified
   */
  add(obs) {
    this.observers.add(obs);
  },
  
  /**
   * Removes an observer function from the observers set
   * @param {Function} obs - Observer callback function to remove
   */
  remove(obs) {
    this.observers.delete(obs);
  },
  
  /**
   * Notifies all registered observers by invoking their callback functions
   */
  notify() {
    this.observers.forEach((obs) => obs());
  },
};

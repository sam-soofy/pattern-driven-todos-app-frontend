# Design Patterns in Todos Managing App (frontend)

This document provides detailed explanations of the design patterns implemented in this project.

## Overview

Todos Managing App (frontend) implements these following key design patterns:
1. **Singleton Pattern** - Single instance management
2. **Observer Pattern** - Reactive state updates
3. **Value Object Pattern** - Immutable, value-based objects
4. **Command Pattern** - Encapsulating operations as command objects
5. **Event Delegation Pattern** - Efficient DOM event handling
6. **Mixin Pattern** - Code reuse and composition

---

## 1. Singleton Pattern

**Location:** `src/js/todo/classes.js` - `TodoList` class

**Purpose:** Ensures only one instance of TodoList exists throughout the application lifecycle, providing a single source of truth for all todo items.

### Implementation

```javascript
class TodoList {
  static #instance = null;

  static {
    this.instance = new TodoList();
  }

  static get instance() {
    return this.#instance;
  }

  constructor() {
    if (TodoList.instance !== null)
      throw new Error('Use TodoList.instance to access the singleton');
  }
}
```

### Usage

```javascript
// Always get the same instance
const todoList1 = TodoList.instance;
const todoList2 = TodoList.instance;

console.log(todoList1 === todoList2); // true

// This will throw an error:
// const list = new TodoList(); // Error!
```

### Benefits
- Single source of truth for application state
- Prevents multiple instances with conflicting data
- Global access point without global variables
- Memory efficient (only one instance)

---

## 2. Observer Pattern

**Location:** `src/js/todo/mixin.js` - `observerMixin`

**Purpose:** Enables reactive UI updates by notifying all subscribers when the TodoList changes, without tight coupling between components.

### Implementation

```javascript
export const observerMixin = {
  observers: new Set(),
  
  add(obs) {
    this.observers.add(obs);
  },
  
  remove(obs) {
    this.observers.delete(obs);
  },
  
  notify() {
    this.observers.forEach((obs) => obs());
  },
};

// Applied to TodoList
Object.assign(TodoList.prototype, observerMixin);
```

### Usage

```javascript
// Subscribe to changes
const todoList = TodoList.instance;

function renderTodoList() {
  // Update UI
  console.log('TodoList changed!');
}

todoList.add(renderTodoList); // Subscribe

// When data changes, notify all observers
todoList.add(newItem); // Internally calls this.notify()
```

### Benefits
- Decouples data layer from UI layer
- Multiple subscribers can react to same changes
- Easy to add/remove observers dynamically
- Follows publish-subscribe pattern

---

## 3. Value Object Pattern

**Location:** `src/js/todo/classes.js` - `TodoItem` class

**Purpose:** Represents todo items as value objects, where equality is based on value rather than reference identity.

### Implementation

```javascript
class TodoItem {
  constructor(text) {
    this.text = text;
  }

  equals(other) {
    return this.text === other.text;
  }
}
```

### Usage

```javascript
const item1 = new TodoItem("Buy milk");
const item2 = new TodoItem("Buy milk");
const item3 = new TodoItem("Buy eggs");

// Reference equality (default JS behavior)
console.log(item1 === item2); // false (different objects)

// Value equality (our custom implementation)
console.log(item1.equals(item2)); // true (same text)
console.log(item1.equals(item3)); // false (different text)
```

### Benefits
- Semantic equality based on content, not identity
- Easier to find and compare items
- Prevents duplicate items with same text
- Immutable-friendly design

---

## 4. Command Pattern

**Location:** `src/js/lib/command.js` - Command class and Command Executor (CE)

**Purpose:** Encapsulates operations (like add, delete) as command objects that are executed through a central Command Executor, decoupling the request from its execution. We also may need to change the rendering process from observer to command execution of todo lists so that we can keep performance while using the observers for more general purposes, and add more functionalities to both patterns (just in mind, not absolute).

### Implementation

```javascript
/**
 * Command class - encapsulates a type and payload
 */
class Command {
  constructor(type, payload) {
    this.type = type;
    this.payload = payload;
  }
}

/**
 * Command types enumeration
 */
const COMMANDS = {
  ADD_TODO: "add",
  REMOVE_TODO_BY_TEXT: "deleteByText",
  UPDATE_TODO: "UPDATE_TODO",
  CLEAR_TODO: "CLEAR_TODO",
};

/**
 * Command Executor (CE) - executes commands
 */
const CE = {
  execute(command) {
    const { type, payload } = command;
    
    switch (type) {
      case COMMANDS.ADD_TODO:
        return todoList.add(payload);
      case COMMANDS.REMOVE_TODO_BY_TEXT:
        return todoList.deleteByText(payload);
      // ... other commands
    }
  },
};
```

### Usage

```javascript
import { CE, Command, COMMANDS } from "./lib/command.js";

// Adding a todo
const newItem = new TodoItem("Buy milk");
CE.execute(new Command(COMMANDS.ADD_TODO, newItem));

// Deleting a todo
CE.execute(new Command(COMMANDS.REMOVE_TODO_BY_TEXT, "Buy milk"));
```

### Benefits
- Decouples operations from their execution
- Easy to add new commands without modifying existing code
- Centralizes operation execution logic
- Enables future features like undo/redo, command queuing, or logging
- Follows Open/Closed Principle (open for extension, closed for modification)

---

## 5. Event Delegation Pattern

**Location:** `src/js/app.js` - Todo list event handling

**Purpose:** Handles events on dynamically created elements efficiently by listening at the parent level instead of attaching listeners to each child.

### Implementation

```javascript
// Instead of adding listener to each delete button:
// ❌ deleteBtn.addEventListener('click', handler); // Bad for dynamic content

// Listen on parent container once:
DOM.todoList.addEventListener("click", (event) => {
  if (event.target.classList.contains("delete-btn")) {
    const text = event.target.dataset.text;
    const item = todoList.find(text);
    if (item) {
      todoList.delete(item);
    }
  }
});
```

### Benefits
- Single event listener instead of many
- Works with dynamically added/removed elements
- Better memory usage
- Improved performance for large lists

---

## 6. Mixin Pattern

**Location:** `src/js/todo/mixin.js` - `observerMixin`

**Purpose:** Enables code reuse and composition by adding methods to existing classes without inheritance.

### Implementation

```javascript
export const observerMixin = {
  observers: new Set(),
  
  add(obs) {
    this.observers.add(obs);
  },
  
  remove(obs) {
    this.observers.delete(obs);
  },
  
  notify() {
    this.observers.forEach((obs) => obs());
  },
};

// Applied to TodoList
Object.assign(TodoList.prototype, observerMixin);
```

### Usage

```javascript
// Subscribe to changes
const todoList = TodoList.instance;

function renderTodoList() {
  // Update UI
  console.log('TodoList changed!');
}

todoList.add(renderTodoList); // Subscribe

// When data changes, notify all observers
todoList.add(newItem); // Internally calls this.notify()
```

### Benefits
- Code reuse and composition
- Flexibility in adding functionality to classes
- Avoids inheritance pitfalls
- Easier to manage and extend

---

## Pattern Interactions

These patterns work together to create a clean architecture:

```
User Action
    ↓
Event Delegation (captures click)
    ↓
Command Pattern (encapsulates operation)
    ↓
Command Executor (CE) (executes command)
    ↓
Singleton TodoList (updates data)
    ↓
Observer Pattern (notifies subscribers)
    ↓
UI Re-render (updates display)
```

### Example Flow

1. User clicks "Add" button
2. Event listener creates new `TodoItem` (Value Object)
3. Command is created: `new Command(COMMANDS.ADD_TODO, newItem)`
4. `CE.execute()` processes the command
5. `TodoList.instance` (Singleton) adds item
6. TodoList calls `notify()` (Observer)
7. Subscribed `renderTodoList()` function executes
8. UI updates automatically

---

## Extending the Patterns

### Adding More Observers

```javascript
// Logger observer
function logChanges() {
  console.log('TodoList updated:', todoList.items);
}

// Analytics observer
function trackAnalytics() {
  analytics.track('todo_list_changed');
}

todoList.add(logChanges);
todoList.add(trackAnalytics);
```

### Adding State Persistence

```javascript
// LocalStorage observer
function persistToStorage() {
  localStorage.setItem('todos', JSON.stringify([...todoList.items]));
}

todoList.add(persistToStorage);
```

---

## Anti-Patterns Avoided

### ❌ God Object
We avoid making TodoList do everything by using the Observer pattern to decouple rendering logic.

### ❌ Tight Coupling
UI components don't directly call render functions; they notify observers instead.

### ❌ Memory Leaks
Using Set for observers allows efficient add/remove operations and prevents duplicates.

---

## Further Reading

- [Singleton Pattern](https://refactoring.guru/design-patterns/singleton)
- [Observer Pattern](https://refactoring.guru/design-patterns/observer)
- [Value Object Pattern](https://martinfowler.com/bliki/ValueObject.html)
- [Command Pattern](https://refactoring.guru/design-patterns/command)
- [Event Delegation](https://javascript.info/event-delegation)
- [Mixin Pattern](https://javascript.info/mixins)

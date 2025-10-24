import { TodoList } from "../todo/classes.js";

const todoList = TodoList.instance;

const LocalStorage = {
  load() {
    const data = localStorage.getItem("todoList");
    if (data) {
      todoList.replaceList(JSON.parse(data));
    }
  },
  save() {
    localStorage.setItem("todoList", JSON.stringify(todoList.items));
  },
};

// Each time the observer gets notified (which is on all TodoList CRUD), save the list to local storage
todoList.addObserver(LocalStorage.save);

export { LocalStorage };

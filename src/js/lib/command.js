import { TodoList } from "../todo/classes.js";

const todoList = TodoList.instance;

/*
 * @typedef {Object} Command
 * @property {string} type - The type (name) of command.
 * @property {string} payload - The payload (arguments) of the command.
 */
class Command {
  constructor(type, payload) {
    this.type = type; // type (or even we can call name, something like a fn name)
    this.payload = payload; // payload (or we can call it args, something like a fn arguments)
  }
}

/**
 * @readonly
 * @enum {string}
 * @property {string} ADD_TODO - The type (name) of command. Command payload (TodoItem) must be provided.
 * @property {string} REMOVE_TODO_BY_TEXT - The type (name) of command. Command payload (text) must be provided.
 * @property {string} UPDATE_TODO - The type (name) of command.
 * @property {string} CLEAR_TODO - The type (name) of command.
 */
const COMMANDS = {
  ADD_TODO: "add",
  REMOVE_TODO_BY_TEXT: "deleteByText",
  UPDATE_TODO: "UPDATE_TODO",
  CLEAR_TODO: "CLEAR_TODO",
};

/**
 * Command Executor (CE)
 * @typedef {Object} CE
 * @property {(command: Command) => any | void} execute - Executes a command and returns
 * the result if available, or `undefined` (void) otherwise.
 */
const CE = {
  execute(command) {
    const { type, payload } = command;

    switch (type) {
      case COMMANDS.ADD_TODO:
        return todoList.add(payload);
      case COMMANDS.REMOVE_TODO_BY_TEXT:
        return todoList.deleteByText(payload);
      case COMMANDS.UPDATE_TODO:
        break;
      case COMMANDS.CLEAR_TODO:
        break;
    }
  },
};

export { CE, Command, COMMANDS };

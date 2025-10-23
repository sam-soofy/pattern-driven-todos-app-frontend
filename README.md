# Todos Managing App (frontend)

A minimalist todo list application built with vanilla JavaScript, demonstrating core design patterns and modern development practices.

## 🎯 Project Overview

This project serves as a practical exercise to explore and implement various design patterns in JavaScript. Built with vanilla JS and styled with Tailwind CSS, it provides a clean, maintainable codebase suitable for learning and extension.

## ✨ Features

- **Add/Delete Todo Items** - Simple and intuitive task management
- **Persistent State Management** - Singleton pattern ensures single source of truth
- **Reactive UI Updates** - Observer pattern for automatic re-rendering
- **Value-Based Equality** - Value Object pattern for TodoItem comparison
- **Modern Styling** - Tailwind CSS for responsive, clean UI

## 🏗️ Design Patterns Implemented

### 1. Singleton Pattern
The `TodoList` class ensures only one instance exists throughout the application lifecycle.

```javascript
const todoList = TodoList.instance; // Always returns the same instance
```

### 2. Observer Pattern
Implemented via mixin to enable reactive UI updates when data changes.

```javascript
todoList.add(renderFunction); // Subscribe to changes
todoList.notify(); // Notify all observers
```

### 3. Value Object Pattern
`TodoItem` uses value-based equality rather than reference equality.

```javascript
item1.equals(item2); // Compares by value, not reference
```

### 4. Event Delegation
Efficient event handling on dynamically created todo items.

## 📁 Project Structure

```
todolist-manager-frontend/
├── src/                    # Source files (development)
│   ├── js/
│   │   ├── classes.js      # TodoItem & TodoList classes
│   │   ├── mixin.js        # Observer pattern implementation
│   │   └── app.js          # Main application & DOM logic
│   ├── styles/
│   │   ├── main.css        # Tailwind directives
│   │   └── output.css      # Generated CSS (gitignored)
│   └── index.html          # HTML entry point
├── public/                 # Static assets (images, fonts, etc.)
├── docs/                   # Generated documentation (gitignored)
├── package.json
├── tailwind.config.js
├── postcss.config.js
├── jsdoc.json
├── .gitignore
├── AGENTS.md
└── README.md
```

**Note:** When migrating to Vite, a `dist/` folder will be added for build output.

## 🚀 Getting Started

### Prerequisites

- Node.js (v16+)
- pnpm (or npm/yarn)

### Installation (First Time Only)

```bash
# 1. Install dependencies (only needed once)
pnpm install

# 2. Build Tailwind CSS (generates output.css)
pnpm run build:css:prod
```

### Running the App

**For active development (recommended):**
```bash
# Runs CSS watch mode + dev server together
pnpm run dev
```

**Or just serve without CSS watch:**
```bash
# If you're not changing styles, just serve the app
pnpm run serve
```

The app will be available at `http://localhost:3000` (or the port shown in terminal).

### Workflow Summary

| When | Command | What it does |
|------|---------|--------------|
| **First time setup** | `pnpm install` | Install dependencies |
| **Before first run** | `pnpm run build:css:prod` | Generate CSS (one time) |
| **Daily development** | `pnpm run dev` | Auto-rebuild CSS + serve |
| **Just testing** | `pnpm run serve` | Serve without CSS rebuild |
| **Production build** | `pnpm run build:css:prod` | Minified CSS for deployment |

## 📚 Documentation

This project uses JSDoc for inline documentation.

### Generate Documentation

```bash
# Generate HTML documentation
pnpm run docs:generate

# Generate Markdown documentation
pnpm run docs:md
```

View generated docs in the `docs/` folder or `DOCUMENTATION.md`.

## 🛠️ Available Scripts

| Script | Description |
|--------|-------------|
| `pnpm run dev` | Start dev server with CSS watch mode |
| `pnpm run build:css` | Build CSS in watch mode |
| `pnpm run build:css:prod` | Build minified CSS for production |
| `pnpm run docs:generate` | Generate HTML documentation |
| `pnpm run docs:md` | Generate Markdown documentation |
| `pnpm run serve` | Serve the `src/` directory |

## 🎨 Customization

### Styling
Modify `src/styles/main.css` to add custom Tailwind utilities or components.

### Adding Features
The modular structure makes it easy to extend:
- Add new methods to `TodoList` class
- Create additional observers
- Implement persistence (localStorage, API, etc.)

## 🔮 Future Enhancements

- [ ] Migrate to Vite + TypeScript
- [ ] Add localStorage persistence
- [ ] Implement edit functionality
- [ ] Add task completion toggle
- [ ] Add filtering (all/active/completed)
- [ ] Add drag-and-drop reordering
- [ ] Unit tests with Vitest

## 📖 Learning Resources

- [Design Patterns in JavaScript](https://www.patterns.dev/)
- [JSDoc Documentation](https://jsdoc.app/)
- [Tailwind CSS](https://tailwindcss.com/)

## 📄 License

MIT

## 🤝 Contributing

This is a personal learning project, but suggestions and improvements are welcome!

---

**Built with ❤️ as a design patterns exercise**

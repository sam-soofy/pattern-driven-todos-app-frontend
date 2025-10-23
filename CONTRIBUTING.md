# Contributing to Pattern-Driven Todos App

Thank you for considering contributing to this project! This document outlines the development workflow, conventions, and guidelines.

## 📋 Table of Contents

- [Development Setup](#development-setup)
- [Workflow & Branching Strategy](#workflow--branching-strategy)
- [Pull Request Process](#pull-request-process)
- [Versioning & Releases](#versioning--releases)
- [Code Conventions](#code-conventions)
- [Testing](#testing)
- [Commit Message Guidelines](#commit-message-guidelines)

## 🛠️ Development Setup

### Prerequisites

- Node.js v16+
- pnpm (recommended) or npm/yarn
- Git

### Initial Setup

```bash
# Clone the repository
git clone https://github.com/sam-soofy/pattern-driven-todos-app-frontend.git
cd pattern-driven-todos-app-frontend

# Install dependencies
pnpm install

# Build CSS for first time
pnpm run build:css:prod

# Start development server
pnpm run dev
```

## 🌿 Workflow & Branching Strategy

### Branch Structure

- **`main`** - Production-ready code, protected branch
- **`dev`** - Active development, default branch for PRs
- **`feature/*`** - Feature branches (e.g., `feature/add-edit-todo`)
- **`fix/*`** - Bug fix branches (e.g., `fix/delete-button-alignment`)

### Development Workflow

1. **Always branch from `dev`:**
   ```bash
   git checkout dev
   git pull origin dev
   git checkout -b feature/your-feature-name
   ```

2. **Make your changes** with frequent, meaningful commits

3. **Test your changes:**
   ```bash
   pnpm run build:css:prod
   pnpm run serve
   # Manually test the app
   ```

4. **Push your branch:**
   ```bash
   git push origin feature/your-feature-name
   ```

5. **Open a Pull Request** to `dev` (NOT `main`)

## 🔀 Pull Request Process

### Before Submitting

- [ ] Code follows project conventions (see below)
- [ ] All files are properly documented with JSDoc
- [ ] CSS classes use component classes where applicable
- [ ] No console.log or debug code left behind
- [ ] Manually tested in browser
- [ ] Branch is up-to-date with `dev`

### PR Guidelines

1. **Title Format:** `[Type] Brief description`
   - Examples: `[Feature] Add edit todo functionality`, `[Fix] Resolve delete button styling`

2. **Description Should Include:**
   - What changed and why
   - How to test the changes
   - Screenshots (if UI changes)
   - Related issues (if any)

3. **Request Review** from maintainers

4. **Respond to Feedback** - address comments and push updates

5. **After Approval** - maintainer will merge to `dev`

### Merging to Main

Only maintainers merge `dev` → `main` after:
- All features are tested and stable
- Documentation is updated
- Version bump is planned

## 🏷️ Versioning & Releases

This project follows [Semantic Versioning](https://semver.org/): `MAJOR.MINOR.PATCH`

### Version Types

- **PATCH** (0.3.0 → 0.3.1) - Bug fixes, minor updates
- **MINOR** (0.3.0 → 0.4.0) - New features, backward-compatible
- **MAJOR** (0.3.0 → 1.0.0) - Breaking changes

### Release Process (Maintainers Only)

**On `main` branch only:**

```bash
# Switch to main and merge dev
git checkout main
git merge dev

# Create versioned release with git tag
pnpm run release:patch   # for bug fixes
pnpm run release:minor   # for new features
pnpm run release:major   # for breaking changes

# This automatically:
# 1. Updates version in package.json
# 2. Creates git commit
# 3. Creates git tag (e.g., v0.4.0)
# 4. Pushes commit + tag to remote
```

### What Happens on Release

- Git tag is created (e.g., `v0.4.0`)
- GitHub Releases page is populated
- Version history is preserved
- Contributors can reference specific versions

**Note:** Do NOT run versioning commands on `dev` branch. Versions are only created on `main`.

## 📝 Code Conventions

### JavaScript

- Use **ES6+ modules** (`import`/`export`)
- Use **const/let**, never `var`
- Use **arrow functions** for callbacks
- Add **JSDoc comments** to all classes, methods, and exported functions
- Use **meaningful variable names**
- Keep functions small and focused

### JSDoc Requirements

```javascript
/**
 * Brief description of function
 * @param {Type} paramName - Description
 * @returns {Type} Description
 * @example
 * functionName(value);
 */
```

### CSS/Tailwind

- **Prefer component classes** over long utility chains
- Use **semantic class names** (`.todo-item` not `.div-1`)
- Add new components to `src/styles/main.css` using `@layer components`
- Use custom theme colors: `primary-*`, `danger-*`

**Good:**
```html
<button class="btn-primary">Submit</button>
```

**Bad:**
```html
<button class="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition-colors">Submit</button>
```

### File Organization

```
src/
├── js/
│   ├── classes.js    # Data models and business logic
│   ├── mixin.js      # Reusable patterns (observers, etc.)
│   └── app.js        # DOM manipulation and events
├── styles/
│   ├── main.css      # Tailwind directives + components
│   └── output.css    # Generated (DO NOT EDIT)
└── index.html        # Entry point
```

## 🧪 Testing

Currently, this project uses **manual testing**. When adding features:

1. Test all user interactions (add, delete, input validation)
2. Test in multiple browsers (Chrome, Firefox, Safari)
3. Test responsive behavior (mobile, tablet, desktop)
4. Check browser console for errors

### Future: Automated Testing

When Vitest is added, tests will be required for:
- All new features
- Bug fixes (add test that reproduces bug, then fix it)
- Pattern implementations (Singleton, Observer, etc.)

## 💬 Commit Message Guidelines

### Format

```
<type>: <subject>

[optional body]

[optional footer]
```

### Types

- **feat:** New feature
- **fix:** Bug fix
- **docs:** Documentation changes
- **style:** Code style/formatting (no functional changes)
- **refactor:** Code restructuring (no functional changes)
- **test:** Adding or updating tests
- **chore:** Maintenance tasks (dependencies, configs)

### Examples

```bash
feat: add edit functionality to todo items

Users can now click an "Edit" button to modify existing todos.
Uses the same input field with updated event handlers.

fix: resolve delete button alignment issue

The delete button was misaligned on mobile devices.
Updated flex properties in .todo-item class.

docs: update README with new versioning workflow
```

### Commit Best Practices

- Use present tense ("add feature" not "added feature")
- Use imperative mood ("move cursor to..." not "moves cursor to...")
- First line: 50 characters or less
- Body: wrap at 72 characters
- Reference issues: `Closes #123`, `Fixes #456`

## 🎯 Design Patterns

This project demonstrates various design patterns. When implementing features, maintain consistency with existing patterns.

**See [PATTERNS.md](./PATTERNS.md) for detailed documentation on all implemented patterns.**

Document any new patterns in your code comments and update PATTERNS.md accordingly.

## 📚 Additional Resources

- [AGENTS.md](./AGENTS.md) - AI assistant instructions
- [PATTERNS.md](./PATTERNS.md) - Detailed pattern explanations
- [README.md](./README.md) - User documentation

## ❓ Questions?

Open an issue or reach out to maintainers for clarification on any guidelines.

## 📜 License

By contributing, you agree that your contributions will be licensed under the MIT License.

---

**Thank you for contributing! 🎉**

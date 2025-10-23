# AGENTS.md

This file contains information for AI coding assistants working on this project.

## Project Overview

Todos Managing App (frontend) is a vanilla JavaScript todo list application demonstrating design patterns (Singleton, Observer, Value Object). Uses Tailwind CSS for styling.

## Common Commands

### Development
```bash
pnpm run dev              # Start dev server with CSS watch
pnpm run serve            # Serve src/ directory only
pnpm run build:css        # Build CSS in watch mode
pnpm run build:css:prod   # Build minified CSS
```

### Documentation
```bash
pnpm run docs:generate    # Generate HTML docs with JSDoc
pnpm run docs:md          # Generate Markdown documentation
```

## Code Style & Conventions

### JavaScript
- Use ES6+ modules (`import`/`export`)
- JSDoc comments required for all classes, methods, and public functions
- Use private fields (`#`) for class internals
- Follow existing patterns in codebase

### Documentation
- All classes and methods must have JSDoc annotations
- Include `@param`, `@returns`, `@type` tags
- Add usage examples in `@example` tags where helpful
- Document design patterns with comments

### Styling
- Use Tailwind CSS utility classes
- No custom CSS unless absolutely necessary
- Maintain responsive design principles

### File Organization
```
src/
  js/         # JavaScript modules
  styles/     # CSS files
  index.html  # Entry point
```

## Design Patterns Used

1. **Singleton** - `TodoList` class (single instance)
2. **Observer** - `observerMixin` for reactive updates
3. **Value Object** - `TodoItem` with value-based equality
4. **Event Delegation** - DOM event handling in app.js

## Testing

Currently no test framework configured. When adding tests:
- Consider Vitest for unit tests
- Test pattern implementations
- Test TodoList CRUD operations

## Migration Path to TypeScript

When migrating to TS:
1. Install TypeScript + Vite
2. Rename `.js` → `.ts`
3. Add type annotations to JSDoc-documented code
4. Create `types.d.ts` for shared types
5. Update build scripts
6. Maintain JSDoc comments for documentation generation

# Riftbound Decksmith

## Project Description

Riftbound Decksmith is a specialized deck-building and analytics web application for the _Riftbound TCG_. It provides players with a clean, fast interface to browse the entire card database, theory-craft new decks, and validate them against official tournament rules.

Built with scalability in mind, this project uses a feature-based architecture and modern React patterns (React 19) to ensure maintainability and performance.

## Features

- **Deck Library:** Save, load, and manage multiple decks locally.
- **Deck Builder:** Interactive deck creation with real-time validation (40-card limit, max 3 copies per card).
- **Card Database:** Browse available cards (mock data currently).
- **Analysis:** Real-time stats on deck composition.
- **Dark Mode:** Validated accessible color scheme.

## Architecture Overview

This project follows a **Feature-Based Architecture** to ensure separation of concerns and scalability.

- **`src/features/`**: Contains domain-specific code (e.g., `deck-builder`, `deck-library`). Each feature is a self-contained module with its own components and pages.
- **`src/shared/`**: Contains shared utilities, components, contexts, and hooks used across multiple features.
- **`src/shared/hooks/`**: Custom hooks, including `useAsync` which leverages React 19's `use` hook for suspense-compatible data fetching.
- **`src/shared/contexts/`**: Global state management (e.g., `DeckContext` for deck state, `ColorModeContext` for theming).
- **`src/shared/api/`**: API layer using the "Service-as-Hook" pattern.

### key Technologies

- **React 19**: Leveraging concurrent features and `use` hook.
- **Vite**: Fast build tool and dev server.
- **Material UI (v6)**: Component library for consistent design.
- **TypeScript**: Strict type safety.
- **ESLint & Prettier**: Code quality and formatting.
- **Vitest**: Unit testing framework.

## Getting Started

1.  **Install Dependencies:**

    ```bash
    npm install
    ```

2.  **Run Development Server:**

    ```bash
    npm run dev
    ```

3.  **Run Tests:**

    ```bash
    npm test
    ```

4.  **Build for Production:**
    ```bash
    npm run build
    ```

## Project Structure

```
src/
├── features/           # Feature-specific modules
│   ├── deck-builder/   # Deck creation logic and UI
│   ├── deck-library/   # Saved deck management
│   └── home/           # Landing page
├── shared/             # Shared resources
│   ├── api/            # Data fetching hooks
│   ├── components/     # Reusable UI components (Layouts, etc.)
│   ├── contexts/       # Global React Contexts
│   ├── hooks/          # Custom hooks (useAsync)
│   ├── logic/          # Core business logic (State creation)
│   ├── utils/          # Helper functions (Storage, Validation)
│   └── types/          # TypeScript definitions
├── App.tsx             # Main application component & Routing
└── main.tsx            # Entry point
```

## Potential Future Features

- **Advanced Card Filtering:** Sort by faction, cost, etc.
- **Import/Export:** Share decks via clipboard codes.
- **Mana Curve Analysis:** Visual charts for deck balance.

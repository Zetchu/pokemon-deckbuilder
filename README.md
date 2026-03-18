# Pokemon Decksmith

## Project Description

Pokémon Decksmith is a specialized deck-building and analytics web application for the **Pokémon Trading Card Game**. It provides players with a clean, fast interface to browse the card database, theory-craft new decks, and validate them against standard deck construction rules.

Built with scalability in mind, this project uses a feature-based architecture and modern React patterns (React 19) to ensure maintainability and performance..

## Features

- **Deck Library:** Save, load, and manage multiple decks locally.
- **Deck Builder:** Interactive deck creation with real-time validation (60-card limit, max 4 copies per card).
- **Card Database:** Browse available cards (Powered by TCGdex API - Base Set).
- **Analysis:** Real-time visual charts for Card Type, Pokémon Type, and HP distribution.
- **Dark Mode:** Validated accessible color scheme.

## Architecture Overview

This project follows a **Feature-Based Architecture** to ensure separation of concerns and scalability.

- **`src/features/`**: Contains domain-specific code (e.g., `deck-builder`, `deck-library`). Each feature is a self-contained module with its own components and pages.
- **`src/shared/`**: Organized by domain/feature:
  - **`pokemon/`**: Core domain logic, types, API, and components for Pokemon TCG.
  - **`ui/`**: Generic UI components, layouts, and theming.
  - **`core/`**: Core application utilities and hooks (e.g., `useAsync`).

### Key Technologies

- **React 19**: Leveraging concurrent features and `use` hook.
- **Vite**: Fast build tool and dev server.
- **Material UI (v6)**: Component library for consistent design.
- **TypeScript**: Strict type safety.
- **ESLint & Prettier**: Code quality and formatting.
- **Vitest**: Unit testing framework.

## Known Issues

- **API Rate Limiting:** The application fetches card data from the public TCGdex API. Heavy usage might trigger rate limits or slower load times on the initial fetch.
- **Mobile Layout:** Chart visualizations may require horizontal scrolling on very small screens.

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
├── shared/             # Shared resources by domain
│   ├── pokemon/        # Pokemon TCG domain logic
│   │   ├── api.ts      # Data fetching
│   │   ├── components/ # Domain-specific UI
│   │   ├── contexts/   # Domain state (DeckContext)
│   │   ├── rules.ts    # Validation logic
│   │   ├── storage.ts  # Persistence logic
│   │   └── types.ts    # Domain types
│   ├── ui/             # Generic UI
│   │   ├── contexts/   # Theme context
│   │   └── MainLayout.tsx # Layout components
│   └── core/           # utilities & hooks
│       └── useAsync.ts # Async state hook
├── App.tsx             # Main application component & Routing
└── main.tsx            # Entry point
```

## Potential Future Features

HP, Retreat Cost, Weakness, etc.

- **Import/Export:** Share decks via clipboard codes or PTCGL format.
- **Multiple Sets:** Expand card database beyond Base Set
- **Mana Curve Analysis:** Visual charts for deck balance.

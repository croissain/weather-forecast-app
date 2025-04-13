# Weather Forecast App

This project is a weather forecast application built with the following technologies:

- **React**
- **TypeScript**
- **SCSS Modules**
- **Axios**
- **ESLint**
- **Prettier**
- **Webpack**

## Getting Started

### Prerequisites

Ensure you have the following installed:

- **Node.js**
- **npm** or **yarn**

### Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd weather-forecast-app
```

2. Install dependencies:

```bash
npm install
# or
yarn install
```

### Development

To start the development server:

```bash
npm start
# or
yarn start
```

The application will be available at `http://localhost:3000`.

### Build

To create a production build:

```bash
npm run build
# or
yarn build
```

### Linting and Formatting

- Run ESLint:

  ```bash
  npm run lint
  # or
  yarn lint
  ```

- Format code with Prettier:
  ```bash
  npm run format
  # or
  yarn format
  ```

## Project Structure

```
weather-forecast-app/
├── public/                     # Static assets (index.html, etc.)
├── src/
│   ├── components/             # Reusable UI components (Typography, Card, etc.)
│   ├── constants/              # App-wide constants (routes, API keys, etc.)
│   ├── hooks/                  # Custom React hooks (useWeather, useClickOutside)
│   ├── layouts/                # Layout wrappers
│   ├── modules/                # Feature modules
│   ├── pages/                  # Page-level components (Home, Search)
│   ├── providers/              # Context providers (LocationProvider)
│   ├── routes/                 # App routing configuration
│   ├── services/               # API services (weatherService, locationService)
│   ├── styles/                 # Global and modular SCSS styles
│   ├── types/                  # TypeScript type definitions
│   ├── utils/                  # Utility functions
│   ├── App.tsx                 # Main App component
│   └── index.tsx               # Application entry point
├── .eslintrc.js                # ESLint configuration
├── .prettierrc                 # Prettier configuration
├── tsconfig.json               # TypeScript configuration
├── webpack.config.js           # Build configuration (depends on setup)
└── package.json                # Project metadata and dependencies
```

## License

This project is licensed under the MIT License.

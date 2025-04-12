# Weather Forecast App

This project is a weather forecast application built with the following technologies:

- **React**
- **TypeScript**
- **SCSS Modules**
- **ESLint**
- **Prettier**
- **Webpack**

## Getting Started

### Prerequisites

Ensure you have the following installed:

- **Node.js** (>= 14.x)
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
├── src/
│   ├── components/   # React components
│   ├── styles/       # SCSS modules
│   ├── utils/        # Utility functions
│   ├── App.tsx       # Main app component
│   └── index.tsx     # Entry point
├── public/           # Static assets
├── .eslintrc.js      # ESLint configuration
├── .prettierrc       # Prettier configuration
├── webpack.config.js # Webpack configuration
└── package.json      # Project metadata and scripts
```

## License

This project is licensed under the MIT License.
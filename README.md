# Weather Project

A simple weather application built with React, TypeScript, and Vite that displays current weather information using the OpenWeatherMap API.

## Features

- Displays current weather conditions
- Shows temperature in metric units
- Clean, responsive interface
- Built with modern React hooks and TypeScript

## Technologies Used

- **React 19** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **Axios** - HTTP client for API requests
- **OpenWeatherMap API** - Weather data source

## Getting Started

### Prerequisites

- Node.js (version 16 or higher)
- npm or yarn

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open your browser and navigate to `http://localhost:5173`

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Project Structure

```
src/
├── api/
│   ├── client.ts      # Axios client configuration
│   └── weather.ts     # Weather API functions
├── components/
│   ├── header.tsx     # Header component
│   └── weather.tsx    # Weather display component
├── App.tsx            # Main application component
├── main.tsx           # Application entry point
└── index.css          # Global styles
```

## API

The application uses the OpenWeatherMap API to fetch weather data. The API client is configured to request data from `https://api.openweathermap.org/data/2.5`.

## License

This project is private and not licensed for public use.

# Weather Dashboard (React + Tailwind + OpenWeather)

## Setup
1. `npm install`
2. Copy `.env.example` to `.env` and add your key from https://openweathermap.org/api
3. `npm run dev` -> open http://localhost:5173

## Features
City search with validation, current weather, 5-day forecast, recent searches (localStorage),
C/F toggle, geolocation, dark mode, skeleton loader, error/empty states, responsive layout.

## Structure
src/components (UI), src/hooks (useWeather, useLocalStorage), src/services (weatherApi.js), src/utils (helpers.js)

Data is fetched once in metric; Fahrenheit is converted client-side, so toggling never re-calls the API.

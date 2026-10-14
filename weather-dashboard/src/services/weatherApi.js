const BASE_URL = 'https://api.openweathermap.org/data/2.5';
const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;

export class ApiError extends Error {
  constructor(message, status = 0) {
    super(message);
    this.status = status;
  }
}

const STATUS_MESSAGES = {
  401: 'Invalid API key. Check VITE_OPENWEATHER_API_KEY (new keys can take up to 2 hours to activate).',
  404: 'City not found. Check the spelling and try again.',
  429: 'Too many requests. Please wait a moment and try again.',
};

async function request(endpoint, params, signal) {
  if (!API_KEY) throw new ApiError('API key missing. Add VITE_OPENWEATHER_API_KEY to your .env file.');
  const qs = new URLSearchParams({ ...params, appid: API_KEY, units: 'metric' });
  let res;
  try {
    res = await fetch(`${BASE_URL}/${endpoint}?${qs}`, { signal });
  } catch (err) {
    if (err.name === 'AbortError') throw err;
    throw new ApiError('Network error. Check your internet connection.');
  }
  if (!res.ok) throw new ApiError(STATUS_MESSAGES[res.status] || 'Weather service is unavailable. Try again later.', res.status);
  return res.json();
}

/** query: { q: 'London' } or { lat, lon }. Always fetched in metric; converted to °F in the UI. */
export async function getWeather(query, signal) {
  const [current, forecast] = await Promise.all([
    request('weather', query, signal),
    request('forecast', query, signal),
  ]);
  return { current, forecast };
}

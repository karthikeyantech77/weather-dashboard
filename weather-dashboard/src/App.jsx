import { useCallback, useEffect, useRef, useState } from 'react';
import useLocalStorage from './hooks/useLocalStorage';
import useWeather from './hooks/useWeather';
import { validateCity } from './utils/helpers';
import SearchBar from './components/SearchBar';
import RecentSearches from './components/RecentSearches';
import CurrentWeather from './components/CurrentWeather';
import Forecast from './components/Forecast';
import Skeleton from './components/Skeleton';
import { ErrorMessage, EmptyState } from './components/Messages';
import { UnitToggle, ThemeToggle } from './components/Toggles';

const MAX_RECENT = 6;

export default function App() {
  const [unit, setUnit] = useLocalStorage('wd-unit', 'C');
  const [theme, setTheme] = useLocalStorage('wd-theme',
    window.matchMedia?.('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
  const [recent, setRecent] = useLocalStorage('wd-recent', []);
  const [inputError, setInputError] = useState('');
  const [geoMessage, setGeoMessage] = useState('');
  const { status, data, error, searchCity, searchCoords } = useWeather();
  const lastCity = useRef(recent[0]);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, [theme]);

  const addRecent = useCallback((name) => {
    setRecent((list) => [name, ...list.filter((c) => c.toLowerCase() !== name.toLowerCase())].slice(0, MAX_RECENT));
  }, [setRecent]);

  const handleSearch = useCallback(async (raw) => {
    const message = validateCity(raw);
    setInputError(message);
    if (message) return;
    setGeoMessage('');
    lastCity.current = raw.trim();
    const result = await searchCity(raw.trim());
    if (result) addRecent(result.current.name);
  }, [searchCity, addRecent]);

  const handleLocate = useCallback((fallbackToRecent = false) => {
    if (!navigator.geolocation) {
      setGeoMessage('Geolocation is not supported by your browser.');
      return;
    }
    navigator.geolocation.getCurrentPosition(
      ({ coords }) => { setGeoMessage(''); setInputError(''); searchCoords(coords.latitude, coords.longitude); },
      (err) => {
        setGeoMessage(err.code === err.PERMISSION_DENIED
          ? 'Location access was denied. You can still search by city name.'
          : 'Could not detect your location. Please search by city name.');
        if (fallbackToRecent === true && lastCity.current) searchCity(lastCity.current);
      },
      { timeout: 10000 }
    );
  }, [searchCoords, searchCity]);

  // Auto-detect location on first load
  useEffect(() => { handleLocate(true); }, [handleLocate]);

  const loading = status === 'loading';

  return (
    <main className="mx-auto max-w-5xl space-y-6 px-4 py-6 sm:px-6 lg:py-10">
      <header className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-2xl font-bold sm:text-3xl">Weather Dashboard</h1>
        <div className="flex gap-2">
          <UnitToggle unit={unit} onChange={setUnit} />
          <ThemeToggle theme={theme} onToggle={() => setTheme((t) => (t === 'dark' ? 'light' : 'dark'))} />
        </div>
      </header>

      <SearchBar onSearch={handleSearch} onLocate={() => handleLocate(false)} error={inputError} disabled={loading} />
      {geoMessage && <p className="text-sm text-amber-600 dark:text-amber-400">{geoMessage}</p>}
      <RecentSearches cities={recent} onSelect={handleSearch} onClear={() => setRecent([])} />

      {status === 'idle' && <EmptyState />}
      {loading && <Skeleton />}
      {status === 'error' && (
        <ErrorMessage message={error} onRetry={lastCity.current ? () => searchCity(lastCity.current) : undefined} />
      )}
      {status === 'success' && (
        <div className="space-y-6">
          <CurrentWeather data={data.current} unit={unit} />
          <Forecast forecast={data.forecast} unit={unit} />
        </div>
      )}
    </main>
  );
}

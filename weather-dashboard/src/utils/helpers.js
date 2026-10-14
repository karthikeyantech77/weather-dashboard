export const toUnit = (c, unit) => Math.round(unit === 'F' ? (c * 9) / 5 + 32 : c);
export const formatTemp = (c, unit) => `${toUnit(c, unit)}°${unit}`;
export const formatWind = (ms, unit) =>
  unit === 'F' ? `${(ms * 2.237).toFixed(1)} mph` : `${(ms * 3.6).toFixed(1)} km/h`;

export const iconUrl = (code) => `https://openweathermap.org/img/wn/${code}@2x.png`;

export const dayLabel = (isoDate) =>
  new Date(`${isoDate}T00:00:00Z`).toLocaleDateString(undefined, {
    weekday: 'short', month: 'short', day: 'numeric', timeZone: 'UTC',
  });

export function validateCity(value) {
  const city = value.trim();
  if (!city) return 'Please enter a city name.';
  if (city.length < 2) return 'City name must be at least 2 characters.';
  if (!/^[\p{L}\s.,'-]+$/u.test(city)) return 'Use letters only (e.g. "London" or "London, GB").';
  return '';
}

/** Collapse 3-hour forecast entries into up to 5 upcoming days (city-local time). */
export function groupForecast(list, tzOffset) {
  const days = {};
  list.forEach((item) => {
    const d = new Date((item.dt + tzOffset) * 1000);
    const key = d.toISOString().slice(0, 10);
    (days[key] ||= []).push({ ...item, hour: d.getUTCHours() });
  });
  const today = new Date(Date.now() + tzOffset * 1000).toISOString().slice(0, 10);

  return Object.entries(days)
    .filter(([date]) => date !== today)
    .slice(0, 5)
    .map(([date, items]) => {
      const midday = items.reduce((a, b) => (Math.abs(b.hour - 12) < Math.abs(a.hour - 12) ? b : a));
      return {
        date,
        min: Math.min(...items.map((i) => i.main.temp_min)),
        max: Math.max(...items.map((i) => i.main.temp_max)),
        icon: midday.weather[0].icon,
        description: midday.weather[0].description,
      };
    });
}

import { memo } from 'react';
import { formatTemp, formatWind, iconUrl } from '../utils/helpers';

const Stat = ({ label, value }) => (
  <div className="rounded-xl bg-slate-100 p-3 text-center dark:bg-slate-700/60">
    <p className="text-xs text-slate-500 dark:text-slate-400">{label}</p>
    <p className="mt-1 text-lg font-semibold">{value}</p>
  </div>
);

function CurrentWeather({ data, unit }) {
  const { name, sys, main, weather, wind } = data;
  return (
    <section className="rounded-2xl bg-white p-6 shadow-md dark:bg-slate-800">
      <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-between">
        <div className="text-center sm:text-left">
          <h2 className="text-2xl font-bold">{name}, {sys.country}</h2>
          <p className="capitalize text-slate-500 dark:text-slate-400">{weather[0].description}</p>
          <p className="mt-2 text-6xl font-bold">{formatTemp(main.temp, unit)}</p>
        </div>
        <img src={iconUrl(weather[0].icon)} alt={weather[0].main} className="h-32 w-32" />
      </div>
      <div className="mt-6 grid grid-cols-2 gap-3 md:grid-cols-4">
        <Stat label="Condition" value={weather[0].main} />
        <Stat label="Feels like" value={formatTemp(main.feels_like, unit)} />
        <Stat label="Humidity" value={`${main.humidity}%`} />
        <Stat label="Wind speed" value={formatWind(wind.speed, unit)} />
      </div>
    </section>
  );
}
export default memo(CurrentWeather);

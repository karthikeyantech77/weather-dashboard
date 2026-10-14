import { memo, useMemo } from 'react';
import { dayLabel, groupForecast, iconUrl, formatTemp } from '../utils/helpers';

const ForecastCard = memo(function ForecastCard({ day, unit }) {
  return (
    <li className="flex flex-col items-center rounded-xl bg-white p-4 shadow-sm dark:bg-slate-800">
      <p className="text-sm font-medium">{dayLabel(day.date)}</p>
      <img src={iconUrl(day.icon)} alt={day.description} className="h-16 w-16" />
      <p className="text-center text-xs capitalize text-slate-500 dark:text-slate-400">{day.description}</p>
      <p className="mt-2 font-semibold">
        {formatTemp(day.max, unit)}{' '}
        <span className="font-normal text-slate-500 dark:text-slate-400">{formatTemp(day.min, unit)}</span>
      </p>
    </li>
  );
});

function Forecast({ forecast, unit }) {
  const days = useMemo(() => groupForecast(forecast.list, forecast.city.timezone), [forecast]);
  return (
    <section>
      <h3 className="mb-3 text-lg font-semibold">5-day forecast</h3>
      <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
        {days.map((d) => <ForecastCard key={d.date} day={d} unit={unit} />)}
      </ul>
    </section>
  );
}
export default memo(Forecast);

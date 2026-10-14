import { useCallback, useRef, useState } from 'react';
import { getWeather } from '../services/weatherApi';

/** status: 'idle' | 'loading' | 'success' | 'error' */
export default function useWeather() {
  const [state, setState] = useState({ status: 'idle', data: null, error: '' });
  const controller = useRef(null);

  const run = useCallback(async (query) => {
    controller.current?.abort(); // cancel any in-flight request
    const ctrl = new AbortController();
    controller.current = ctrl;
    setState((s) => ({ ...s, status: 'loading', error: '' }));
    try {
      const data = await getWeather(query, ctrl.signal);
      setState({ status: 'success', data, error: '' });
      return data;
    } catch (err) {
      if (err.name !== 'AbortError') setState({ status: 'error', data: null, error: err.message });
      return null;
    }
  }, []);

  const searchCity = useCallback((city) => run({ q: city }), [run]);
  const searchCoords = useCallback((lat, lon) => run({ lat, lon }), [run]);

  return { ...state, searchCity, searchCoords };
}

import axios from 'axios';
import { getKeyValue, TOKEN_DICTIONARY } from './storage.service.js';

const getWeatherIcon = () => {
  return '☁️';
}

const getWeather = async (city: string) => {
  const token = await getKeyValue(TOKEN_DICTIONARY.token);

  if (!token) throw new Error('API token not set, set it via command -t [API_KEY]!');

  const { data } = await axios.get('https://api.openweathermap.org/data/2.5/weather', {
    params: {
      q: city,
      appid: token,
      lang: 'en',
      units: 'metric',
    }
  });

  return data;
};

export { getWeather, getWeatherIcon };
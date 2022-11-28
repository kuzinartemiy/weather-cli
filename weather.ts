#!/usr/bin/env node
import { AxiosError } from 'axios';
import { getArgs } from './helpers/args.js';
import { getWeather, getWeatherIcon } from './services/api.service.js';
import { printHelp, printSuccess, printError, printWeather } from './services/log.service.js';
import { getKeyValue, saveKeyValue, TOKEN_DICTIONARY } from './services/storage.service.js';

const saveToken = async (token: string): Promise<void> => {
  if (!token.length) {
    printError('No token passed!');
    return;
  };

  try {
    await saveKeyValue(TOKEN_DICTIONARY.token, token);
    printSuccess('Token saved successfully!');
  } catch(error) {
    printError((error as Error).message);
  }
};

const saveCity = async (city: string) => {
  if (!city.length) {
    printError('No city passed!');
    return;
  }
  try {
    await saveKeyValue(TOKEN_DICTIONARY.city, city);
    printSuccess('City saved successfully!');
  } catch(error) {
    printError((error as Error).message);
  }
}

const getForcast = async () => {
  try {
    const city = process.env.CITY ?? await getKeyValue(TOKEN_DICTIONARY.city);

    const weather = await getWeather(city);
    const icon = getWeatherIcon();

    printWeather(weather, icon);
  } catch(error) {
    if ((error as AxiosError)?.response?.status === 404) {
      printError('City not found.');
    } else if((error as AxiosError)?.response?.status === 401) {
      printError('Invalid token.');
    } else {
      printError((error as Error).message);
    }
  }
};

const initCLI = () => {
  const args = getArgs(process.argv);
  if (args.h) {
    // Print help
    return printHelp();
  }

  if (args.s) {
    // Save city
    if (typeof args.s === 'string') return saveCity(args.s);
    return printError('No city passed!');
  }

  if (args.t) {
    // Save token
    if (typeof args.t === 'string') return saveToken(args.t);
    return printError('No token passed!');
  }

  // Print weather
  return getForcast();
};

initCLI();
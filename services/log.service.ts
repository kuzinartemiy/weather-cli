import chalk from 'chalk';
import dedent from 'dedent-js';
import { IWeather } from '../types';

const printError = (error: string) => {
  console.log(chalk.bgRed(' ERROR ') + ' ' + error);
}

const printSuccess = (message: string) => {
  console.log(chalk.bgGreen(' SUCCESS ') + ' ' + message);
}

const printHelp = () => {
  console.log(
    dedent`${chalk.bgCyan(' HELP ')}
    Without params - print weather.
    -s [CITY] for setup city.
    -h for print help.
    -t [API KEY] for save token.
    `
  );
}

const printWeather = (res: IWeather, icon: string) => {
  console.log(
    dedent`${chalk.bgYellow(' WEATHER ')} Weather at ${res.name}
    ${icon}  ${res.weather[0].description}
    Temp: ${res.main.temp}
    Feel like: ${res.main.feels_like}
    Humidity: ${res.main.humidity}%
    Wind: ${res.wind.speed}
    `
  );
}

export { printError, printSuccess, printHelp, printWeather };
import { homedir } from 'os';
import { join } from 'path';
import { promises } from 'fs';
import { IStorageData } from '../types';

const filePath = join(homedir(), 'weather-data.json');

const TOKEN_DICTIONARY = {
  token: 'token',
  city: 'city',
};

const saveKeyValue =  async (key: string, value: string) => {
  let data: IStorageData = {};
  if (await isExist(filePath)) {
    const file = await (await promises.readFile(filePath)).toString();
    data = JSON.parse(file);
  }
  data[key] = value;
  await promises.writeFile(filePath, JSON.stringify(data));
};

const getKeyValue = async (key: string) => {
  if (await isExist(filePath)) {
    const file = await (await promises.readFile(filePath)).toString();
    let data = JSON.parse(file);
    return data[key];
  }
  return undefined;
}

const isExist = async (path: string) => {
  try {
    await promises.stat(path);
    return true;
  } catch {
    return false;
  }
}

export { saveKeyValue, getKeyValue, TOKEN_DICTIONARY };
import { env } from '@/conf';

const getPrefixedKey = (key: string) => `${env.STORAGE_PREFIX}${key}`;

function read<T>(key: string, parser: (data: unknown) => T, fallback: T) {
  try {
    const readed = window.localStorage.getItem(getPrefixedKey(key)) || '';
    const json = JSON.parse(readed);
    return parser(json);
  } catch {
    return fallback;
  }
}

function save<T>(key: string, value: T) {
  try {
    window.localStorage.setItem(getPrefixedKey(key), JSON.stringify(value));
  } catch (e: unknown) {
    console.warn(e);
  }
  return value;
}

function del(key: string) {
  try {
    window.localStorage.removeItem(getPrefixedKey(key));
  } catch (e: unknown) {
    console.warn(e);
  }
  return key;
}

export default { read, save, del, getPrefixedKey };

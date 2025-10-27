import fs from 'node:fs';

const LEN = { min: 3, max: 20 };

const LANGS_DIRECTORY = './src/Assets/Langs';
const WORDS_FILE = 'words.json';
const TRANSL_FILE = 'translations.json';

const langDirs = fs
  .readdirSync(LANGS_DIRECTORY, { withFileTypes: true })
  .filter(item => item.isDirectory())
  .map(item => item.name);

const findNotLowerKey = words => Object.keys(words).find(k => k !== k.toLowerCase());

const findNotUpperValue = words =>
  Object.values(words)
    .flat()
    .find(v => v !== v.toUpperCase());

const findDupliacates = words => {
  const w = Object.values(words).flat();
  const duplicates = w.filter((v, i) => w.indexOf(v) !== i);
  return duplicates.length ? duplicates.join(', ') : null;
};

const findInvalidChars = (words, chars) =>
  Object.values(words)
    .flat()
    .find(v => !new RegExp(`^[${chars}]+$`).test(v));

const findInvalidLength = words =>
  Object.values(words)
    .flat()
    .find(v => v.length > LEN.max || v.length < LEN.min);

const withLang = (lang, error) => `${lang} -> ${error}`;
function verify() {
  for (const lang of langDirs) {
    let words;
    let chars;
    try {
      words = JSON.parse(fs.readFileSync(`${LANGS_DIRECTORY}/${lang}/${WORDS_FILE}`, 'utf8'));
    } catch {
      return withLang(lang, 'Failed to read and parse words file');
    }
    try {
      chars =
        JSON.parse(fs.readFileSync(`${LANGS_DIRECTORY}/${lang}/${TRANSL_FILE}`, 'utf8')).alphabet +
        ' ';
    } catch {
      return withLang(lang, 'Failed to read and parse translations file');
    }

    const notLowerKey = findNotLowerKey(words);
    if (notLowerKey) {
      return withLang(lang, `Key '${notLowerKey}' is not lowercase`);
    }
    const notUpperValue = findNotUpperValue(words);
    if (notUpperValue) {
      return withLang(lang, `Value '${notUpperValue}' is not uppercase`);
    }
    const duplicates = findDupliacates(words);
    if (duplicates) {
      return withLang(lang, `Duplicate words found: ${duplicates}`);
    }
    const invalidChars = findInvalidChars(words, chars);
    if (invalidChars) {
      return withLang(lang, `Invalid characters found in: ${invalidChars}`);
    }
    const invalidLength = findInvalidLength(words);
    if (invalidLength) {
      return withLang(lang, `Invalid length found in: ${invalidLength}`);
    }
  }
  return null;
}

export default verify;

import envVerify from './env.js';
import wordsVerify from './words.js';

const verifiers = [
  { name: '.env', verify: envVerify },
  { name: 'words.json', verify: wordsVerify }
];

const error = {
  name: '',
  content: ''
};

for (const verifier of verifiers) {
  const err = verifier.verify();

  if (err) {
    error.name = verifier.name;
    error.content = err;
    break;
  }
  console.log(`OK: ${verifier.name}`);
}

if (error.name && error.content) {
  console.warn(`PROBLEM: ${error.name}`);
  console.error(error.content);
  console.log('');

  throw new Error(`Problem occured! Look above`);
}

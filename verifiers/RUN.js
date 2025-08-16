import envParse from './env.js';

const verifiers = [
  { name: '.env', parse: envParse }
];

const error = {
  name: '',
  issue: null
};

for (const verifier of verifiers){
  const res = verifier.parse();

  if (!res.success) {
    error.name = verifier.name;
    error.issue = res.error.issues[0];
    break;
  }
  console.log(`OK: ${verifier.name}`);
}

if (error.name && error.issue){
  console.warn(`PROBLEM: ${error.name}`);
  console.error(`${error.issue.path[0]}: ${error.issue.message}`);
  console.log('');

  throw new Error(`Problem occured! Look above`);
}

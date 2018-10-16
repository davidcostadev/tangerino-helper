require('colors');

const dotenv = require('dotenv');

dotenv.config();

const getEnv = (config) => {
  const env = process.env[config]

  if (!env) throw new Error(`Please type your "${config}"`.bgRed.black);

  return env
}


module.exports = {
  EMPLOYER_CODE: getEnv('EMPLOYER_CODE'),
  PIN: getEnv('PIN'),
  USER_NAME: getEnv('USER_NAME'),
}

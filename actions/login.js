require('colors');

const configs = require('../config');

const data = {
  employerCode: configs.EMPLOYER_CODE,
  pin: configs.PIN,
}

async function doLogin (page) {
  console.log('Action'.bgWhite.black, 'doLogin');

  await page.screenshot({path: './prints/01-before-login.png'});
  await page.click('.abaLogin li:nth-child(2) a');
  await page.screenshot({path: './prints/02-before-login.png'});
  await page.type('input[name="codigoEmpregador"]', data.employerCode);
  await page.type('input[name="pin"]', data.pin);
  await page.screenshot({path: './prints/03-before-login.png'});
  await Promise.all([
    page.click('.btnLogin'),
    page.waitForNavigation()
  ]);
  await page.screenshot({path: './prints/04-after-login.png'});
}

module.exports = doLogin;

require('colors');

const configs = require('../config');

const username = configs.USER_NAME;

async function setUser (page) {
  console.log('Action'.bgWhite.black, 'setUser');
  
  await page.screenshot({path: './prints/07-before-setUser.png'});
  await page.click('.select2-selection')
  await page.type('.select2-search__field', username)
  await page.click('.select2-results__options li:first-child')
  await page.screenshot({path: './prints/08-after-login.png'});
}


function parseData (text) {
  console.log('Action'.bgWhite.black, 'parseData');

  const saldo = text
    .match(/Saldo do dia:<\/br>(.*?)<\/span>/g)
    .filter(s => s.includes('Saldo do dia'))
    .filter(s => s.match(/-?[0-9][0-9]:[0-9][0-9]/))
    .map(s => s.match(/-?[0-9][0-9]:[0-9][0-9]/)[0])
    .reduce((acc, time) => {
      let isNegative, hours, minutes;
      isNegative = time.startsWith('-');
      if (isNegative) {
        hours = parseInt(time.split(/-|:/)[1]) * 60;
        minutes = parseInt(time.split(/-|:/)[2]);
      } else {
        hours = parseInt(time.split(':')[0]) * 60;
        minutes = parseInt(time.split(':')[1]);
      }
      return isNegative ? acc - (hours + minutes) : acc + hours + minutes
   }, 0) / 60 + ' horas';

   return saldo
}

async function clickConsultar (page) {
  console.log('Action'.bgWhite.black, 'clickConsultar');
  
  await page.screenshot({path: './prints/09-before-clickConsultar.png'});
  const [response] = await Promise.all([
    page.waitForResponse(response => response.url().match(/content:searchFilters:filterForm:consultar/i)),
    page.click('.botaoConsultar')
  ])
  await page.screenshot({path: './prints/10-after-clickConsultar.png'});

  return parseData(await response.text())
}


module.exports = {
  setUser,
  clickConsultar,
};

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

const parseDate = date => new Date(date.split('/').reverse().join('-'));

const dateMonthSet = (date, num) => {
  date.setMonth(date.getMonth() + num)
  return date;
}

const getLastDay = date => new Date(date.getFullYear(), date.getMonth()+1, 0)

const toString = (data) => data.toJSON().split('T').filter((a, i) => i === 0).join().split('-').reverse().join('')

async function setPreviousMonth(page) {
  console.log('Action'.bgWhite.black, 'setPreviousMonth');

  await page.screenshot({path: './prints/08-before-setPreviousMonth.png'});
  const dateBegin = parseDate(await page.$eval('[name="containerPorPeriodo:dataInicio"]', input => {
    const value = input.value
    input.value = '';
    return value;
  }));
  const dateEnd = parseDate(await page.$eval('[name="containerPorPeriodo:dataFim"]', input => {
    const value = input.value
    input.value = '';
    return value;
  }));
  await page.screenshot({path: './prints/09-before-setPreviousMonth.png'});
  
  const firstDay = dateMonthSet(dateBegin, - 1);
  const lastDay = getLastDay(dateMonthSet(dateEnd, - 1));
  firstDay.setDate(0);
  
  await page.type('[name="containerPorPeriodo:dataInicio"]', toString(firstDay))
  await page.type('[name="containerPorPeriodo:dataFim"]', toString(lastDay))
  await page.screenshot({path: './prints/10-before-setPreviousMonth.png'});
  
  // console.log({
  //   firstDay: toString(firstDay),
  //   lastDay: toString(lastDay),
  // })
}

const addZero = n => n <= 9 ? `0${n}` : n;

const getTime = saldo => (
  [
    saldo < 0 ? '-' : '',
    [
      saldo,
      saldo % 1 * 60,
    ].map(Math.abs)
    .map(Math.floor)
    .map(addZero)
    .join(':')
  ].join('')
)

function parseData (text) {
  console.log('Action'.bgWhite.black, 'parseData');
  
  const saldo = text
    .match(/Saldo do dia:<\/br>(.*?)<\/span>/g)
    .filter(s => s.includes('Saldo do dia'))
    .filter(s => s.match(/-?[0-9][0-9]:[0-9][0-9]/))
    .map(s => s.match(/-?[0-9][0-9]:[0-9][0-9]/)[0])
    // .map(s => {
    //   console.log(s)
    //   return s
    // })
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
   }, 0) / 60;

   const time = getTime(saldo)

   return {
     time,
     status: saldo < 0 ? 'DEBT'.bgRed.black: 'CREDIT'.bgGreen.black
   }
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
  setPreviousMonth,
};

require('colors');
const puppeteer = require('puppeteer');
const doStart = require('./actions/login');
const openPageHoras = require('./actions/openPageHoras');
const {
  setUser,
  clickConsultar,
  setPreviousMonth,
} = require('./actions/getInfos');

async function start() {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  await page.goto('https://app.tangerino.com.br/Tangerino/pages/LoginPage/');

  try {
    await doStart(page);
    await openPageHoras(page);
    await setUser(page);
    const balanceCurrentMonth = await clickConsultar(page);
    await setPreviousMonth(page);
    const balancePreviousMonth = await clickConsultar(page);

    console.log('\n\n');
    console.log('balance'.bgYellow.black);
    console.log('previous month:', balancePreviousMonth.time, balancePreviousMonth.status);
    console.log('current month:', balanceCurrentMonth.time, balanceCurrentMonth.status);
  } catch (e) {
    console.error(e);
  }


  await browser.close();
}

start();

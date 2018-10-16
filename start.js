require('colors');
const puppeteer = require('puppeteer');
const doStart = require('./actions/login');
const openPageHoras = require('./actions/openPageHoras');
const {
  setUser,
  clickConsultar
} = require('./actions/getInfos');

async function start() {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  await page.goto('https://app.tangerino.com.br/Tangerino/pages/LoginPage/');

  await doStart(page);
  await openPageHoras(page);
  await setUser(page);
  const saldo = await clickConsultar(page);

  console.log(`Saldo: ${saldo}`.bgGreen.black)

  await browser.close();
}

start();

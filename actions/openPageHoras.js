require('colors');

async function openPageHoras (page) {
  console.log('Action'.bgWhite.black, 'openPageHoras');
  
  await page.screenshot({path: './prints/05-before-open.png'});
  await page.click('.ic-nav-horas');
  await page.screenshot({path: './prints/06-after-login.png'});
}

module.exports = openPageHoras;

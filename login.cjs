const puppeteer = require('puppeteer');

async function main() {
  const users = [
    { memberCode: '102105121', password: 'edu.shardaaa' },
    { memberCode: '202105123', password: 'edu.openai' },
    // Add more user objects as needed
  ];

  const browser = await puppeteer.launch({ headless: false });

  for (const user of users) {
    const page = await browser.newPage();
    await page.goto('https://webkiosk.thapar.edu/');

    await page.type('[name="MemberCode"]', user.memberCode, { delay: 100 });
    await page.type('[type="password"]', user.password, { delay: 100 });

    await Promise.all([
      page.waitForNavigation(),
      page.click('#BTNSubmit'),
    ]);

    const profile = await page.$('frame');
    if (profile) {
      console.log(`User ${user.memberCode} successfully logged in!`);
    } else {
      console.log(`User ${user.memberCode} login failed.`);
    }

    await page.close();
  }

  await browser.close();
}

main().catch(console.error);

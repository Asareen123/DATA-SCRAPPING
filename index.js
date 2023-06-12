import puppeteer from "puppeteer";

const getRooms = async () => {
  const browser = await puppeteer.launch({
    headless: false,
    defaultViewport: null,
  });

  const page = await browser.newPage(); 
  let currentPage = 1;
  let currentval = 25; 
  
  while (currentPage) {
    await page.goto(
      `https://www.booking.com/searchresults.html?label=msn-zuZJn6tMErEHQWt84cPEuw-8891541149%3Atikwd-80745569598330%3Aloc-90%3Aneo%3Amte%3Alp1658%3Adec%3Aqsbooking.com%2Bhotels&aid=375653&ss=Ajmer&ssne=Ajmer&ssne_untouched=Ajmer&lang=en-us&sb=1&src_elem=sb&src=index&dest_id=-2088344&dest_type=city&group_adults=2&no_rooms=1&group_children=0&sb_travel_purpose=leisure&offset=${currentval}`,
      {
        waitUntil: "domcontentloaded",
      }
    );

    const rooms = await page.evaluate(() => {
      const results = [];
      const roomList = document.querySelectorAll(
        '#search_results_table > div:nth-child(2) > div > div > div.d4924c9e74 > [data-testid="property-card"]'
      );

      roomList.forEach((element) => {
        const roomName = element.querySelector(
          'div.d20f4628d0 > div.b978843432 > div > div > div > div.b1e6dd8416.aacd9d0b0a > div > div:nth-child(1) > div > h3 > a > div.fcab3ed991.a23c043802'
        ).textContent.trim();

        results.push(roomName);
      });

      return results;
    });

    console.log(rooms);
    
    const nextPageButton = await page.$('#search_results_table > div:nth-child(2) > div > div > div.d7a0553560 > div.a826ba81c4.fa2f36ad22.afd256fc79.d08f526e0d.ed11e24d01.ef9845d4b3.b727170def > nav > div > div.f32a99c8d1.f78c3700d2 > button');
    
    if (nextPageButton) {
      // Do something with the next button element
      // For example, you can click on the next button:
      currentval += 25;
      await nextPageButton.click();
    } else {
      // Handle the case when there is no next button available
      console.log('No next button found');
      break;
    }
  }

  await browser.close();
};

getRooms();

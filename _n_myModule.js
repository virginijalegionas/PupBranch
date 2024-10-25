

exports.openNewPage = async function (pageUrl) {
  const browser = await puppeteer.launch(
    {
      headless: false,
      defaultViewport: false,
      args: ['--start-maximized']
    }
  );
  const newPage = await browser.newPage();
  await newPage.goto(pageUrl);
  return newPage;
}

exports.scrollIntoObject = async function(page, objSelector){
  for (let i = 0; i < 10; i++) {
    await page.evaluate((objSelector, i) => {
      setTimeout(() => {
        const element = document.querySelectorAll(objSelector)[i]
        if(element) {
          element.scrollIntoView();
        }
      }, 2000);
    }, objSelector, i)
  }
}






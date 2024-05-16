const fs = require('fs');
const fileForData = 'BookResults.csv';

exports.clickNextButton = async function (page) {
  let xpath = `xpath=//button[contains(text(), 'Next')]`;
  await page.locator(xpath).click();
}
exports.clickPreviousButton = async function (page) {
  let xpath = `xpath=//button[contains(text(), 'Previous')]`;
  await page.locator(xpath).click();
}

exports.selectRowsPerPage = async function (page, rowsInPage) {
  let xpath = `xpath=//select[@aria-label='rows per page']`;
  const rows = await page.$(xpath);
  await rows.select(rowsInPage);
}

exports.scrapBookData = async function (page) {
  let fileExists = fs.existsSync(fileForData);
  //delete file before start
  if (fileExists == true) {
    fs.unlinkSync(fileForData);
  }

  const headerElement = await page.$(`.rt-tr`);
  let allHeaderValues = await headerElement.$$eval('.rt-resizable-header-content', nodes => nodes.map(n => n.innerText));
  // Write Header values into the file
  let lastHeaderValue = allHeaderValues.length - 1;
  for (i in allHeaderValues) {
    if (i != lastHeaderValue) {
      fs.appendFile(fileForData, `${allHeaderValues[i]}, `,
        function (err) {
          if (err) throw err;
        }
      );
    }
    else {
      fs.appendFile(fileForData, `${allHeaderValues[i]}\n`,
        function (err) {
          if (err) throw err;
        }
      );
    }
  }

  let rowElements = await page.$$(`.rt-tr-group`);
  for (let row in rowElements) {
    let bookPicture = await rowElements[row].$eval('div.rt-td > img', n => n.getAttribute("src"));
    fs.appendFile(fileForData, `${bookPicture.substr(8)}, `,
      function (err) {
        if (err) throw err;        
      }
    );
    let bookTitle = await rowElements[row].$eval(`div > span > a`, n => n.innerText);
    fs.appendFile(fileForData, `${bookTitle}, `,
      function (err) {
        if (err) throw err;
      }
    );
    let bookAuthor = await rowElements[row].$eval(`xpath=.//div[@class='rt-td'][3]`, n => n.innerText);
    fs.appendFile(fileForData, `${bookAuthor}, `,
      function (err) {
        if (err) throw err;
      }
    );
    let bookPublisher = await rowElements[row].$eval(`xpath=.//div[@class='rt-td'][4]`, n => n.innerText);
    fs.appendFile(fileForData, `${bookPublisher}\n`,
      function (err) {
        if (err) throw err;
      }
    );

  }
}




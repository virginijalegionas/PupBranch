require('dotenv').config();
const puppeteer = require('puppeteer');
var bookStore = require('../Elements/BookStore');
var common = require('../Common.js');
const expect = require('expect.js');
const fileForData = 'BookResults.csv';
const fs = require('fs');


describe('Book Store Tests', function () {
  let page;
  let browser;
  this.timeout(100000);
  const browserOptions = {
    headless: false,
    defaultViewport: false,
    args: ['--start-maximized']
  }

  beforeEach(async function () {
    browser = await puppeteer.launch(browserOptions);
    page = await browser.newPage();
    await page.goto(process.env.pageLink);
  });

  it(`Scrap Data Into File`, async function () {
    await common.clickBlockInHomePage(page, "Elements");
    await common.hideElementsList(page, "Elements");
    await common.scrollToBottom(page);
    await common.clickElementGroup(page, "Book Store Application");
    await common.clickElementInMenu(page, "Book Store");
    await common.wait(2);
    await bookStore.selectRowsPerPage(page, '5');

    await bookStore.scrapBookData(page);
    let fileContent = fs.readFileSync(fileForData, "utf-8");
    expect(fileContent).to.contain("Addy Osmani");
    expect(fileContent).not.contain("Marijn Haverbeke");

  });






  afterEach(async function () {
    await browser.close();
  });

});
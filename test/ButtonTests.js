let pageUrl = "https://demoqa.com/";
const puppeteer = require('puppeteer');
var buttons = require('../Elements/Buttons.js');
var common = require('../Common.js');
const expect = require('expect.js');

describe('Button Tests', function () {
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
    await page.goto(pageUrl);
  });

  it(`Right Click Button Test`, async function () {
    let expectedResponseMessage = 'You have done a right click';
    await common.clickBlockInHomePage(page, "Elements");
    await common.clickElementInMenu(page, "Buttons");
    await buttons.clickRightButton(page);

    let responseMessage = await buttons.getRightClickMessage(page);
    expect(responseMessage).to.equal(`${expectedResponseMessage}`);
  });

  it(`Double Click Button Test`, async function () {
    let expectedResponseMessage = 'You have done a double click';
    await common.clickBlockInHomePage(page, "Elements");
    await common.clickElementInMenu(page, "Buttons");
    await buttons.clickDoubleButton(page);

    let responseMessage = await buttons.getDoubleClickMessage(page);
    expect(responseMessage).to.eql(`${expectedResponseMessage}`);
  });

  it(`Click Button Test`, async function () {
    let expectedResponseMessage = 'You have done a dynamic click';
    await common.clickBlockInHomePage(page, "Elements");
    await common.clickElementInMenu(page, "Buttons");
    await buttons.clickMeButton(page);

    let responseMessage = await buttons.getClickMeMessage(page);
    expect(responseMessage).to.equal(`${expectedResponseMessage}`);
  });

  afterEach(async function () {
    await browser.close();
  });

});
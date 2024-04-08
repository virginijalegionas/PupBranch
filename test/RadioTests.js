let pageUrl = "https://demoqa.com/";
const puppeteer = require('puppeteer');
var radio = require('../Elements/RadioButton.js');
var common = require('../Common.js');
const expect = require('expect.js');

describe('Radio Tests', function () {
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

  it(`Validate if Radio is selectable`, async function () {
    await common.clickBlockInHomePage(page, "Elements");
    await common.clickElementInMenu(page, "Radio Button");

    expect(await radio.isRadioSelectable(page, "Yes")).to.equal(true);
    expect(await radio.isRadioSelectable(page, "Impressive")).to.equal(true);
    expect(await radio.isRadioSelectable(page, "No")).to.equal(false);
  });

  it(`Check selected Radio`, async function () {
    await common.clickBlockInHomePage(page, "Elements");
    await common.clickElementInMenu(page, "Radio Button");

    await radio.selectRadio(page, "Yes");
    expect(await radio.getSelectedRadioValue(page)).to.equal("Yes");
    await radio.selectRadio(page, "Impressive");
    expect(await radio.getSelectedRadioValue(page)).to.equal("Impressive");
  });


  afterEach(async function () {
    await browser.close();
  });

});
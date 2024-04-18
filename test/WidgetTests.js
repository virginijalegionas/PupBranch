require('dotenv').config();
const puppeteer = require('puppeteer');
var widgets = require('../Elements/Widgets.js');
var common = require('../Common.js');
const expect = require('expect.js');

describe('Widget Tests', function () {
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

  it(`Accordian Test`, async function () {
    await common.clickBlockInHomePage(page, "Widgets");
    await common.clickElementInMenu(page, "Accordian");

    await widgets.expandAccordian(page, "What is Lorem Ipsum");
    await widgets.collapseAccordian(page, "What is Lorem Ipsum");
    await widgets.expandAccordian(page, "Where does it come from");
    let text = await widgets.getAccordianText(page, "Where");
    let expectedText = "The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested.";
    expect(text).contain(expectedText);
  });
  it(`Progress Test`, async function () {
    await common.clickBlockInHomePage(page, "Widgets");
    await common.clickElementInMenu(page, "Progress Bar");

    await widgets.clickStartStop(page);
    await common.wait(2);
    await widgets.clickStartStop(page);
    let progressValue = await widgets.getProgressValue(page);
    expect(progressValue).to.be.within(15, 23);
    //one more round
    await widgets.clickStartStop(page);
    await common.wait(2);
    await widgets.clickStartStop(page);
    progressValue = await widgets.getProgressValue(page);
    expect(progressValue).to.be.within(35, 45);

  });


  afterEach(async function () {
    await browser.close();
  });

});
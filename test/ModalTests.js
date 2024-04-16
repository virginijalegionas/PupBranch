require('dotenv').config();
const puppeteer = require('puppeteer');
var modals = require('../Elements/Modals.js');
var common = require('../Common.js');
const expect = require('expect.js');
const expectedSmallModalHeader = "Small Modal";
const expectedLargeModalHeader = "Large Modal";
const expectedSmallModalBodyText = "This is a small modal. It has very less content";
const expectedLargeModalBodyText = "Lorem Ipsum is simply dummy text of the printing and typesetting industry.";

describe('Modal Tests', function () {
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

  it(`Small Modal Test`, async function () {
    await common.clickBlockInHomePage(page, "Alerts, Frame & Windows");
    await common.clickElementInMenu(page, "Modal Dialogs");
    await modals.clickSmallModalButton(page);
    let smallModalHeader = await modals.getModalHeaderText(page);
    let smallModalBodyText = await modals.getModalBodyText(page);

    expect(smallModalHeader).to.equal(`${expectedSmallModalHeader}`);
    expect(smallModalBodyText).to.equal(`${expectedSmallModalBodyText}`);

    await modals.closeSmallModalByCloseButton(page);

    await modals.clickSmallModalButton(page);
    await modals.closeModalByX(page);

  });

  it(`Large Modal Test`, async function () {
    await common.clickBlockInHomePage(page, "Alerts, Frame & Windows");
    await common.clickElementInMenu(page, "Modal Dialogs");
    await modals.clickLargeModalButton(page);
    let largeModalHeader = await modals.getModalHeaderText(page);
    let largeModalBodyText = await modals.getModalBodyText(page);

    expect(largeModalHeader).to.equal(`${expectedLargeModalHeader}`);
    expect(largeModalBodyText).to.contain(`${expectedLargeModalBodyText}`);

    await modals.closeLargeModalByCloseButton(page);

    await modals.clickLargeModalButton(page);
    await modals.closeModalByX(page);

  });



  afterEach(async function () {
    await browser.close();
  });

});
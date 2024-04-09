require('dotenv').config();
const puppeteer = require('puppeteer');
var links = require('../Elements/Links.js');
var common = require('../Common.js');
const expect = require('expect.js');

describe('Link Tests', function () {
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

  it(`Created Link Test`, async function () {
    let expectedResponseMessage = 'Link has responded with staus 201 and status text Created';
    await common.clickBlockInHomePage(page, "Elements");
    await common.clickElementInMenu(page, "Links");
    await links.clickLink(page, "Created");

    let responseMessage = await links.getLinkResponseMessage(page);
    expect(expectedResponseMessage).to.equal(`${responseMessage}`);
  });
  it(`No ContentLink Test`, async function () {
    let expectedResponseMessage = 'Link has responded with staus 204 and status text No Content';
    await common.clickBlockInHomePage(page, "Elements");
    await common.clickElementInMenu(page, "Links");
    await links.clickLink(page, "No Content");

    let responseMessage = await links.getLinkResponseMessage(page);
    expect(responseMessage).to.equal(`${expectedResponseMessage}`);
  });
  it(`Moved Test`, async function () {
    let expectedResponseMessage = 'Link has responded with staus 301 and status text Moved Permanently';
    await common.clickBlockInHomePage(page, "Elements");
    await common.clickElementInMenu(page, "Links");
    await links.clickLink(page, "Moved");

    let responseMessage = await links.getLinkResponseMessage(page);
    expect(responseMessage).to.equal(`${expectedResponseMessage}`);
  });

  it(`Bad Request Test`, async function () {
    let expectedResponseMessage = 'Link has responded with staus 400 and status text Bad Request';
    await common.clickBlockInHomePage(page, "Elements");
    await common.clickElementInMenu(page, "Links");
    await links.clickLink(page, "Bad Request");

    let responseMessage = await links.getLinkResponseMessage(page);
    expect(responseMessage).to.equal(`${expectedResponseMessage}`);
  });
  it(`Unauthorized Test`, async function () {
    let expectedResponseMessage = 'Link has responded with staus 401 and status text Unauthorized';
    await common.clickBlockInHomePage(page, "Elements");
    await common.clickElementInMenu(page, "Links");
    await links.clickLink(page, "Unauthorized");

    let responseMessage = await links.getLinkResponseMessage(page);
    expect(responseMessage).to.equal(`${expectedResponseMessage}`);
  });
  it(`Forbidden Test`, async function () {
    let expectedResponseMessage = 'Link has responded with staus 403 and status text Forbidden';
    await common.clickBlockInHomePage(page, "Elements");
    await common.clickElementInMenu(page, "Links");
    await links.clickLink(page, "Forbidden");

    let responseMessage = await links.getLinkResponseMessage(page);
    expect(responseMessage).to.equal(`${expectedResponseMessage}`);
  });
  it(`Not Found Link Test`, async function () {
    let expectedResponseMessage = 'Link has responded with staus 404 and status text Not Found';
    await common.clickBlockInHomePage(page, "Elements");
    await common.clickElementInMenu(page, "Links");
    await links.clickLink(page, "Not Found");

    let responseMessage = await links.getLinkResponseMessage(page);
    expect(responseMessage).to.equal(`${expectedResponseMessage}`);
  });

  it(`Home Link Test`, async function () {
    await common.clickBlockInHomePage(page, "Elements");
    await common.clickElementInMenu(page, "Links");
    let xpath = `xpath=//a[text()="Home"]`;
    const link = await page.$(xpath);
    const [target] = await Promise.all([
      new Promise(resolve => browser.once('targetcreated', resolve)),
      link.click(),
    ]);

    const newTab = await target.page();
    await newTab.bringToFront();
    let newTabUrl = await newTab.url();
    expect(newTabUrl).to.equal(`${pageUrl}`);

  });

  it(`Dynamic Link Test`, async function () {
    await common.clickBlockInHomePage(page, "Elements");
    await common.clickElementInMenu(page, "Links");
    let selector = '#dynamicLink';
    const link = await page.$(selector);
    const [target] = await Promise.all([
      new Promise(resolve => browser.once('targetcreated', resolve)),
      link.click(),
    ]);

    const newTab = await target.page();
    await newTab.bringToFront();
    let newTabUrl = await newTab.url();
    expect(newTabUrl).to.equal(`${pageUrl}`);

  });

  afterEach(async function () {
    await browser.close();
  });

});
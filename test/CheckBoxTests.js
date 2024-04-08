let pageUrl = "https://demoqa.com/";
const puppeteer = require('puppeteer');
var checkBox = require('../Elements/CheckBox.js');
var common = require('../Common.js');
const expect = require('expect.js');

describe('CheckBox Tests', function () {
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

  it(`Check Uncheck All`, async function () {
    await common.clickBlockInHomePage(page, "Elements");
    await common.clickElementInMenu(page, "Check Box");
    await checkBox.expandHomeTreeList(page);
    await checkBox.checkNodeCheckBox(page, "Home");
    expect(await checkBox.isNodeChecked(page, "Home")).to.equal("checked");
    expect(await checkBox.isNodeChecked(page, "Desktop")).to.equal("checked");
    expect(await checkBox.isNodeChecked(page, "Documents")).to.equal("checked");
    await checkBox.expandChildList(page, "Desktop");
    expect(await checkBox.isNodeChecked(page, "Notes")).to.equal("checked");
    //unchecking all
    await checkBox.unCheckNodeCheckBox(page, "Home")
    expect(await checkBox.isNodeChecked(page, "Home")).to.equal("unChecked");
    expect(await checkBox.isNodeChecked(page, "Desktop")).to.equal("unChecked");
    expect(await checkBox.isNodeChecked(page, "Documents")).to.equal("unChecked");
    expect(await checkBox.isNodeChecked(page, "Notes")).to.equal("unChecked");
  });

  it(`Check Uncheck Child`, async function () {
    await common.clickBlockInHomePage(page, "Elements");
    await common.clickElementInMenu(page, "Check Box");
    await checkBox.expandHomeTreeList(page);
    await checkBox.expandChildList(page, "Desktop");
    await checkBox.checkNodeCheckBox(page, "Notes");

    expect(await checkBox.isNodeChecked(page, "Home")).to.equal("halfChecked");
    expect(await checkBox.isNodeChecked(page, "Desktop")).to.equal("halfChecked");
    expect(await checkBox.isNodeChecked(page, "Notes")).to.equal("checked");
    expect(await checkBox.isNodeChecked(page, "Commands")).to.equal("unChecked");
    //unchecking child
    await checkBox.unCheckNodeCheckBox(page, "Notes")
    expect(await checkBox.isNodeChecked(page, "Home")).to.equal("unChecked");
    expect(await checkBox.isNodeChecked(page, "Desktop")).to.equal("unChecked");
    expect(await checkBox.isNodeChecked(page, "Notes")).to.equal("unChecked");
  });

  it(`Check Uncheck Child Parent MISC`, async function () {
    await common.clickBlockInHomePage(page, "Elements");
    await common.clickElementInMenu(page, "Check Box");
    await checkBox.expandHomeTreeList(page);
    await checkBox.expandChildList(page, "Documents");
    await checkBox.expandChildList(page, "WorkSpace");
    await checkBox.checkNodeCheckBox(page, "Angular");

    expect(await checkBox.isNodeChecked(page, "Home")).to.equal("halfChecked");
    expect(await checkBox.isNodeChecked(page, "Documents")).to.equal("halfChecked");
    expect(await checkBox.isNodeChecked(page, "WorkSpace")).to.equal("halfChecked");
    expect(await checkBox.isNodeChecked(page, "Angular")).to.equal("checked");
    expect(await checkBox.isNodeChecked(page, "React")).to.equal("unChecked");
    //Check Parent
    await checkBox.checkNodeCheckBox(page, "WorkSpace")
    expect(await checkBox.isNodeChecked(page, "Home")).to.equal("halfChecked");
    expect(await checkBox.isNodeChecked(page, "Documents")).to.equal("halfChecked");
    expect(await checkBox.isNodeChecked(page, "WorkSpace")).to.equal("checked");
    expect(await checkBox.isNodeChecked(page, "React")).to.equal("checked");
    expect(await checkBox.isNodeChecked(page, "Angular")).to.equal("checked");
    expect(await checkBox.isNodeChecked(page, "Veu")).to.equal("checked");
    //uncheck Child
    await checkBox.unCheckNodeCheckBox(page, "Veu")
    expect(await checkBox.isNodeChecked(page, "Home")).to.equal("halfChecked");
    expect(await checkBox.isNodeChecked(page, "Documents")).to.equal("halfChecked");
    expect(await checkBox.isNodeChecked(page, "WorkSpace")).to.equal("halfChecked");
    expect(await checkBox.isNodeChecked(page, "React")).to.equal("checked");
    expect(await checkBox.isNodeChecked(page, "Angular")).to.equal("checked");
    expect(await checkBox.isNodeChecked(page, "Veu")).to.equal("unChecked");
    //uncheck Parent
    await checkBox.unCheckNodeCheckBox(page, "WorkSpace")
    expect(await checkBox.isNodeChecked(page, "Home")).to.equal("unChecked");
    expect(await checkBox.isNodeChecked(page, "Documents")).to.equal("unChecked");
    expect(await checkBox.isNodeChecked(page, "WorkSpace")).to.equal("unChecked");
    expect(await checkBox.isNodeChecked(page, "React")).to.equal("unChecked");
    expect(await checkBox.isNodeChecked(page, "Angular")).to.equal("unChecked");
    expect(await checkBox.isNodeChecked(page, "Veu")).to.equal("unChecked");

  });

  afterEach(async function () {
    await browser.close();
  });

});
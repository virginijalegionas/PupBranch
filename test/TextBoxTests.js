let pageUrl = "https://demoqa.com/";
const puppeteer = require('puppeteer');
var textBox = require('../Elements/TextBox.js');
var common = require('../Common.js');
const expect = require('expect.js');

describe('TextBox Tests', function () {
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

  it(`Smoke Test`, async function () {
    await common.clickBlockInHomePage(page, "Elements");
    await common.clickElementInMenu(page, "Text Box");
    let fullName = `testName ${await common.genRandom()}`;
    let email = `mail${await common.genRandom()}@mail.com`;
    let currAddress = `current address`;
    let permAddress = `permanent address`;
    await textBox.inputTextBox(page, "Full Name", fullName);
    await textBox.inputTextBox(page, "Email", email);
    await textBox.inputTextBox(page, "Current Address", currAddress);
    await textBox.inputTextBox(page, "Permanent Address", permAddress);
    await textBox.clickSubmit(page);
    var results = await textBox.getTextBoxResults(page);
    expect(results[0]).to.equal(`${fullName}`);
    expect(results[1]).to.equal(`${email}`);
    expect(results[2]).to.equal(`${currAddress}`);
    expect(results[3]).to.equal(`${permAddress}`);
  });
  it(`Update Test`, async function () {

    await common.clickBlockInHomePage(page, "Elements");
    await common.clickElementInMenu(page, "Text Box");
    let fullName = `testName ${await common.genRandom()}`;
    let email = `mail${await common.genRandom()}@mail.com`;
    let currAddress = `current address`;
    let permAddress = `permanent address`;
    await textBox.inputTextBox(page, "Full Name", fullName);
    await textBox.inputTextBox(page, "Email", email);
    await textBox.inputTextBox(page, "Current Address", currAddress);
    await textBox.inputTextBox(page, "Permanent Address", permAddress);
    await textBox.clickSubmit(page);
    //Update data
    let fullNameUpdate = `updName ${await common.genRandom()}`;
    let emailUpdate = `updMail${await common.genRandom()}@mail.com`;
    let currAddressUpdate = `Updated current address`;
    let permAddressUpdate = `Updated permanent address`;
    await textBox.inputTextBox(page, "Full Name", fullNameUpdate);
    await textBox.inputTextBox(page, "Email", emailUpdate);
    await textBox.inputTextBox(page, "Current Address", currAddressUpdate);
    await textBox.inputTextBox(page, "Permanent Address", permAddressUpdate);
    await textBox.clickSubmit(page);
    var results = await textBox.getTextBoxResults(page);
    expect(results[0]).to.equal(`${fullNameUpdate}`);
    expect(results[1]).to.equal(`${emailUpdate}`);
    expect(results[2]).to.equal(`${currAddressUpdate}`);
    expect(results[3]).to.equal(`${permAddressUpdate}`);
  });
  it(`Email Validation Test`, async function () {
    await common.clickBlockInHomePage(page, "Elements");
    await common.clickElementInMenu(page, "Text Box");
    //validation that email field border is changed when non supported email entered
    let nonSupportedEmail = `mail${await common.genRandom()}`;
    await textBox.inputTextBox(page, "Email", nonSupportedEmail);
    await textBox.clickSubmit(page);
    let classAttributeValue = await textBox.getEmailClassAttributeValue(page);
    let expectedClassAttributeValue = 'mr-sm-2 field-error form-control';
    expect(classAttributeValue).to.equal(`${expectedClassAttributeValue}`);

    //validation, that email border becomes common when supported email entered
    let supportedEmail = `mail${await common.genRandom()}@gmail.com`;
    await textBox.inputTextBox(page, "Email", supportedEmail);
    await textBox.clickSubmit(page);
    classAttributeValue = await textBox.getEmailClassAttributeValue(page);
    expect(classAttributeValue).to.not.equal(`${expectedClassAttributeValue}`);

    var results = await textBox.getTextBoxResults(page);
    expect(results[0]).to.equal(`${supportedEmail}`);
  });

  afterEach(async function () {
    await browser.close();
  });

});
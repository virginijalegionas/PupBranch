let pageUrl = "https://demoqa.com/";
const puppeteer = require('puppeteer');
var wtables = require('../Elements/WebTables.js');
var common = require('../Common.js');
const expect = require('expect.js');

describe('Web Tables Tests', function () {
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

  it(`Add New Record into Table Test`, async function () {
    await common.clickBlockInHomePage(page, "Elements");
    await common.clickElementInMenu(page, "Web Tables");
    let fName = `fName ${await common.genRandom()}`;
    let lName = `lName ${await common.genRandom()}`;
    let email = `emmail@mail.com`;
    let age = '20';
    let salary = '2000';
    let department = `dep ${await common.genRandom()}`;
    await wtables.clickAddButton(page);
    await wtables.inputFieldValue(page, "First Name", fName);
    await wtables.inputFieldValue(page, "Last Name", lName);
    await wtables.inputFieldValue(page, "Email", email);
    await wtables.inputFieldValue(page, "Age", age);
    await wtables.inputFieldValue(page, "Salary", salary);
    await wtables.inputFieldValue(page, "Department", department);
    await wtables.clickSubmitButton(page);
    var tableResults = await wtables.getTableData(page);
    var foundRow = tableResults.find(x => x["First Name"] == fName);
    expect(foundRow["First Name"]).equal(fName);
    expect(foundRow["Last Name"]).equal(lName);
    expect(foundRow["Email"]).equal(email);
    expect(foundRow["Age"]).equal(age);
    expect(foundRow["Salary"]).equal(salary);
    expect(foundRow["Department"]).equal(department);

  });

  it(`Edit Record in Table Test`, async function () {
    await common.clickBlockInHomePage(page, "Elements");
    await common.clickElementInMenu(page, "Web Tables");
    let fName = `fName ${await common.genRandom()}`;
    let lName = `lName ${await common.genRandom()}`;
    let email = `onemail@mail.com`;
    let age = '41';
    let salary = '2150';
    let department = `dep ${await common.genRandom()}`;
    await wtables.clickEditInTableByFirstName(page, "Cierra");
    await wtables.inputFieldValue(page, "First Name", fName);
    await wtables.inputFieldValue(page, "Last Name", lName);
    await wtables.inputFieldValue(page, "Email", email);
    await wtables.inputFieldValue(page, "Age", age);
    await wtables.inputFieldValue(page, "Salary", salary);
    await wtables.inputFieldValue(page, "Department", department);
    await wtables.clickSubmitButton(page);
    var tableResults = await wtables.getTableData(page);
    var foundRow = tableResults.find(x => x["First Name"] == fName);
    expect(foundRow["First Name"]).equal(fName);
    expect(foundRow["Last Name"]).equal(lName);
    expect(foundRow["Email"]).equal(email);
    expect(foundRow["Age"]).equal(age);
    expect(foundRow["Salary"]).equal(salary);
    expect(foundRow["Department"]).equal(department);

  });

  it(`Deleted Record in Table Test`, async function () {
    await common.clickBlockInHomePage(page, "Elements");
    await common.clickElementInMenu(page, "Web Tables");
    await wtables.clickDeleteInTableByFirstName(page, "Kierra");
    var tableResults = await wtables.getTableData(page);
    expect(tableResults.map(x => x["First Name"])).not.contain("Kierra");
  });

  it(`Search Record in Table Test`, async function () {
    await common.clickBlockInHomePage(page, "Elements");
    await common.clickElementInMenu(page, "Web Tables");
    await wtables.searchInTheTable(page, "Alden");
    var tableResults = await wtables.getTableData(page);
    var getRow = tableResults.find(x => x["First Name"] == "Alden");
    expect(getRow["First Name"]).equal("Alden");
    expect(getRow["Last Name"]).equal("Cantrell");
    expect(getRow["Email"]).equal("alden@example.com");
    expect(getRow["Age"]).equal("45");
    expect(getRow["Salary"]).equal("12000");
    expect(getRow["Department"]).equal("Compliance");
    //checking it is possible to search with different values from different columns  
    await wtables.searchInTheTable(page, "Compliance");
    var tableResults2 = await wtables.getTableData(page);
    var getRow2 = tableResults.find(x => x["First Name"] == "Alden");
    expect(getRow2["First Name"]).equal("Alden");
    expect(getRow2["Last Name"]).equal("Cantrell");
    expect(getRow2["Email"]).equal("alden@example.com");
    expect(getRow2["Age"]).equal("45");
    expect(getRow2["Salary"]).equal("12000");
    expect(getRow2["Department"]).equal("Compliance");

  });

  afterEach(async function () {
    await browser.close();
  });

});
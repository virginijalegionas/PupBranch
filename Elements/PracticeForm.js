var modals = require('../Elements/Modals.js');
var textBox = require('../Elements/TextBox.js');
var upDown = require('../Elements/UploadDownload.js');

exports.inputText = async function (page, textBoxName, textBoxValue) {
  await textBox.inputTextBox(page, textBoxName, textBoxValue);
}

exports.inputFirstName = async function (page, value) {
  let selector = `#firstName`;
  await page.locator(selector).fill(value);
}

exports.inputLastName = async function (page, value) {
  let selector = `#lastName`;
  await page.locator(selector).fill(value);
}

exports.choosePicture = async function (page, fileName) {
  await upDown.uploadFile(page, fileName);
}

exports.selectDateOfBirth = async function (page, yearValue, monthValue, dayValue) {
  const calendar = await page.$("#dateOfBirthInput");
  await calendar.click();

  const year = await page.$(".react-datepicker__year-select");
  await year.select(yearValue);

  //month text and value are different, select option chooses by value. first need to identify value by text
  let monthXpath = `xpath=//option[contains(text(),"${monthValue}")]`;
  let selectorMonthValue = await page.$eval(monthXpath, n => n.getAttribute("value"));
  const month = await page.$(".react-datepicker__month-select");
  await month.select(selectorMonthValue);

  let dayXpath = `xpath=//div[not(contains(@class, 'outside-month')) and text()='${dayValue}' ]`;
  const day = await page.$(dayXpath);
  await day.click();
}




exports.selectGender = async function (page, value) {
  const mgender = await page.$(`div > input[value="${value}"]`);
  await mgender.click();
}
exports.selectHobbies = async function (page, value) {
  let xpath = `xpath=//label[contains(text(),'${value}')]/preceding-sibling::input`;
  const hobby = await page.$(xpath);
  await hobby.click();
}

exports.selectState = async function (page, value) {
  const state = await page.$("#state");
  await state.click();
  const stateDropdown = await page.$(`xpath=//div[contains(text(),"${value}")]`);
  await stateDropdown.click();
}

exports.selectCity = async function (page, value) {
  const city = await page.$("#city");
  await city.click();
  const cityDropdown = await page.$(`xpath=//div[contains(text(),"${value}")]`);
  await cityDropdown.click();
}

exports.selectSubjects = async function (page, value) {
  let xpath = `xpath=//div[@id="subjectsContainer"]//input`;
  let searchString = await value.at(0);
  await page.locator(xpath).fill(searchString);
  await page.evaluate(() => {
    window.scrollTo(0, document.body.scrollHeight);
  });
  const subjectDropdown = await page.$(`xpath=//div[contains(text(),"${value}")]`);
  await subjectDropdown.click();
}

exports.clickSubmit = async function (page) {
  await textBox.clickSubmit(page);
}

exports.closeResultsForm = async function (page) {
  await modals.closeLargeModalByCloseButton(page);
}

exports.getFormData = async function (page) {
  var tableResults = new Array();

  var rowsElement = await page.$$('xpath=//table/tbody/tr');
  var labelElement = await page.$$('xpath=//table/tbody/tr[1]');
  var valueElement = await page.$$('xpath=//table/tbody/tr[2]');

  for (let element in rowsElement) {
    var rowsLabel = await rowsElement[element].$$eval('td:first-child', nodes => nodes.map(n => n.innerText));
    var rowsValue = await rowsElement[element].$$eval('td:last-child', nodes => nodes.map(n => n.innerText));

    tableResults[rowsLabel] = rowsValue;

  }
  //let it be commented, in case there will be time I need it to be printed in screen
  // for (let rr in tableResults) {
  //     for (const [key, value] of Object.entries(tableResults[rr])) {
  //         console.log(key, value);
  //     }
  // }
  return tableResults;
}


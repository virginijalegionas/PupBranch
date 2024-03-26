let pageUrl =  "https://demoqa.com/";
const puppeteer =  require('puppeteer');
var mod = require('./myModule');
var common = require('./Common');
var textBox = require('./Elements/TextBox');
var radio = require('./Elements/RadioButton');
var checkBox = require('./Elements/CheckBox');
var wTables = require('./Elements/WebTables');
var buttons = require('./Elements/Buttons');
var links = require('./Elements/Links');
var upDown = require('./Elements/UploadDownload');
var alert = require('./Elements/Alerts');
var modals = require('./Elements/Modals');

// openNewPage = async function (pageUrl) {
//   const browser = await puppeteer.launch(
//     {
//       headless: false,
//       defaultViewport: false,
//       args: ['--start-maximized']
//     }
//   );
//   const newPage = (await browser.newPage());
//   await newPage.goto(pageUrl);
//   return newPage;
// }


(async () => {
  // Launch the browser and open a new blank page
  const browser = await puppeteer.launch(
        {
          headless: false,
          defaultViewport: false,
          args: ['--start-maximized']
        }
      );
      const page = await browser.newPage();
      await page.goto(pageUrl);
  
  //click consent
 // await common.clickConsent(page);
  //click Elements block in home Page
  await common.clickBlockInHomePage(page, "Alerts, Frame & Windows");
//   //Fill TextBoxes  
  // await common.clickElementInMenu(page, "Text Box");
  //  let fullName = `testName ${await common.genRandom()}`;
//   let email = `mail${await common.genRandom()}@mail.com`;
//   let currAddress = `current address`;
//   let permAddress = `permanent address`;
 //  await textBox.inputTextBox(page, "Full Name", fullName);
//   await textBox.inputTextBox(page, "Email", email);
//   await textBox.inputTextBox(page, "Current Address", currAddress);
//   await textBox.inputTextBox(page, "Permanent Address", permAddress);
//   //await common.clickButton(page, "#submit");
  
  // for (let i = 0; i < 20; i++) {
  //   const selector = '#submit';

  //   await page.evaluate((selector, i) => {
  //     setTimeout(() => {
  //       const element = document.querySelectorAll(selector)[i]
  //       if(element) {
  //         element.scrollIntoView();
  //       }
  //     }, 2000);
  //   }, selector, i);
  // }
// await page.locator('xpath=//button[@id="submit"]').click();
// const submit =  await page.$('#submit');
// submit.click();

// await mod.getTextBoxResults(page);

// await common.clickElementInMenu(page, "Radio Button");
// await radio.selectRadio(page, "Impressive");

// await common.clickElementInMenu(page, "Check Box");
// await checkBox.expandHomeTreeList(page);
// await checkBox.expandHomeTreeList(page);

// await checkBox.expandChildList(page, "Documents");
// await checkBox.expandChildList(page, "Documents");
// await checkBox.expandChildList(page, "WorkSpace");
// await checkBox.checkNodecheckBox(page, "WorkSpace");
// await checkBox.checkNodecheckBox(page, "WorkSpace");
// await checkBox.checkNodecheckBox(page, "Office");
// await checkBox.checkNodecheckBox(page, "Angular");
// await checkBox.unCheckNodecheckBox(page, "WorkSpace");
// await checkBox.unCheckNodecheckBox(page, "WorkSpace");


 await common.clickElementInMenu(page, "Modal Dialogs");
//  await wTables.clickAddButton(page);
// await wTables.inputFieldValue(page, "First Name", "John");
// await wTables.inputFieldValue(page, "Last Name", "John");
// await wTables.inputFieldValue(page, "Email", "John@ea.com");
// await wTables.inputFieldValue(page, "Age", "12");
// await wTables.inputFieldValue(page, "Salary", "200");
// await wTables.inputFieldValue(page, "Department", "aaaaaaaa");
// await wTables.clickSubmitButton(page);
// await wTables.searchInTheTable(page,"45");
// await wTables.searchInTheTable(page,"29");
// await wTables.clickDeleteInTableByFirstName(page, "Cierra");
// await wTables.clickEditInTableByFirstName(page, "Alden");
//   await wTables.inputFieldValue(page, "Age", "12");
//  await wTables.clickSubmitButton(page);
//await wTables.getTableData(page);
// await buttons.clickRightButton(page);
// await buttons.getRightClickMessage(page);
//await links.clickDynamicLink(page);
//await links.getLinkResponseMessage(page);

// let tabCount = (await browser.pages()).length; 
// console.log(`current tab count: ${tabCount}`);
//await upDown.uploadFile(page, "sample1.jpeg");
//await alert.clickButton(page, "Click Button to see alert");
//await alert.dismissAllert(page,"On button click, confirm box will appear");
await modals.clickSmallModalButton(page);
await modals.getModalHeaderText(page);
await modals.getModalBodyText(page);
await modals.closeModalByX(page);
await common.wait(5);
  await common.wait(5);
  
  await browser.close();
})();



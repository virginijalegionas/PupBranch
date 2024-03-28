exports.clickConsent = async function (page) {
    let consentButton = 'body > div.fc-consent-root > div.fc-dialog-container > div.fc-dialog.fc-choice-dialog > div.fc-footer-buttons-container > div.fc-footer-buttons > button.fc-button.fc-cta-consent.fc-primary-button > p';
    await page.locator(consentButton).click();
  }

  exports.backToHomePage = async function (page) {
    let xpath = `xpath=//header/a`;
    const homePage = await page.locator(xpath).click();
  }
  exports.clickBlockInHomePage = async function (page, blockName) {
    let xpath = `xpath=//div//h5[contains(text(), "${blockName}")]`;
    await page.locator(xpath).click();
  }
  
  exports.clickElementGroup = async function (page, groupName) {
    let xpath = `xpath=//div[contains(text(),"${groupName}")]`;
    await page.locator(xpath).click();
  }
  
  
  exports.expandElementsList = async function (page, listName) {
    let listXpath = `xpath=//span//div[contains(text(),"${listName}")]/ancestor::span/following-sibling::div`;
    let classValue = await page.$eval(listXpath, el => el.getAttribute("class"))
    if (classValue == "element-list collapse") {
      await exports.clickElementGroup(page, listName);
    }
    else {
      console.log(`Element Group: "${listName}" is already expanded`);
    }
  }
  exports.hideElementsList = async function (page, listName) {
    let listXpath = `xpath=//span//div[contains(text(),"${listName}")]/ancestor::span/following-sibling::div`;
    let classValue = await page.$eval(listXpath, el => el.getAttribute("class"))
    if (classValue == "element-list collapse show") {
      await exports.clickElementGroup(page, listName);
    }
    else {
      console.log(`Element Group: "${listName}" is already hidden`);
    }
  }
  
  exports.wait = async function (seconds) {
    var waitSeconds = seconds * 1000;
    await new Promise(r => setTimeout(r, waitSeconds));
  }
  
  exports.clickElementInMenu = async function (page, elementName) {
    let xpath = `xpath=//span[contains(text(), "${elementName}")]`;
    await page.locator(xpath).click();
  }

  exports.clickButton = async function (page, buttonSelector){
    //await exports.scrollIntoObject(page, buttonSelector);  
    await page.locator(buttonSelector).click();  
  }
  exports.genRandom = async function (){
  let r = (Math.random() + 1).toString(36).substring(7);
  return r;
  }
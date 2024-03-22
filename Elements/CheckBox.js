var common = require('./../Common');

exports.expandHomeTreeList = async function (page) {    
    // let listXpath = `#tree-node > ol > li > span > button > svg`;
    // let classValue = await page.$eval(listXpath, el => el.getAttribute("class"))
    // if (classValue == "rct-icon rct-icon-expand-close") {
    //     let buttonXpath = `xpath=//span[contains(text(),"Home")]//parent::label//preceding-sibling::button`;
    //     await page.locator(buttonXpath).click();
    // }
    // else {
    //   console.log(`Home Tree List is already expanded`);
    // }
    await exports.expandChildList(page,"Home");
  }

  exports.collapseHomeTreeList = async function (page) {    
    await exports.collapseChildList(page,"Home");
  }
  exports.collapseChildList = async function (page, listName) {    
   try{
    let listXpath = `xpath=//span[contains(text(),"${listName}")]//ancestor::span[@class="rct-text"]/button/*[local-name() = 'svg']`;
    let classValue = await page.$eval(listXpath, el => el.getAttribute("class"))
    if (classValue == "rct-icon rct-icon-expand-open") {
        let buttonXpath = `xpath=//span[contains(text(),"${listName}")]//ancestor::span[@class="rct-text"]/button`;
        await page.locator(buttonXpath).click();
    }
    else {
      console.log(`${listName} Tree List is already collapsed`);
    }
}
catch (err){
    console.log(`there was an error caught: ${err}`);
}
  }

  exports.expandChildList = async function (page, listName) {
    try{
    let listXpath = `xpath=//span[contains(text(),"${listName}")]//ancestor::span[@class="rct-text"]/button/*[local-name() = 'svg']`;
    let classValue = await page.$eval(listXpath, el => el.getAttribute("class"))
    if (classValue == "rct-icon rct-icon-expand-close") {
        let buttonXpath = `xpath=//span[contains(text(),"${listName}")]//ancestor::span[@class="rct-text"]/button`;
        await page.locator(buttonXpath).click();
    }
    else {
      console.log(`${listName} Tree List is already expanded`);
    }
}
catch (err){
    console.log(`there was an error caught: ${err}`);
}
  }


  exports.checkNodecheckBox = async function (page, nodeName) {
    try{
    let nodeXpath = `xpath=//span[contains(text(),"${nodeName}")]//preceding-sibling::span[@class="rct-checkbox"]/*[local-name() = 'svg']`;
    let classValue = await page.$eval(nodeXpath, el => el.getAttribute("class"))
    if (classValue == "rct-icon rct-icon-uncheck") {
        let checkBoxXpath = `xpath=//span[contains(text(),"${nodeName}")]//preceding-sibling::span[@class="rct-checkbox"]`;
        await page.locator(checkBoxXpath).click();
    }
    else {
      console.log(`${nodeName} node is already checked`);
    }
}
catch (err){
    console.log(`there was an error caught: ${err}`);
}
  }
  exports.unCheckNodecheckBox = async function (page, nodeName) {
    try{
    let nodeXpath = `xpath=//span[contains(text(),"${nodeName}")]//preceding-sibling::span[@class="rct-checkbox"]/*[local-name() = 'svg']`;
    let classValue = await page.$eval(nodeXpath, el => el.getAttribute("class"))
    if (classValue == "rct-icon rct-icon-check") {
        let checkBoxXpath = `xpath=//span[contains(text(),"${nodeName}")]//preceding-sibling::span[@class="rct-checkbox"]`;
        await page.locator(checkBoxXpath).click();
    }
    else {
      console.log(`${nodeName} node is already unchecked`);
    }
}
catch (err){
    console.log(`there was an error caught: ${err}`);
}
  }

//span[contains(text(),"React")]//preceding-sibling::span[@class="rct-checkbox"]/*[local-name() = 'svg']
//span[contains(text(),"Home")]//parent::label//preceding-sibling::button//child::svg
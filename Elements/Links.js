var common = require('./../Common');

exports.clickLink = async function (page, linkName ){    
    let xpath = `xpath=//a[text()="${linkName}"]`;
    await page.locator(xpath).click();  
  }

  exports.getLinkResponseMessage = async function (page){    
    const element = await page.$("#linkResponse");
const message = await (await element.getProperty('textContent')).jsonValue();
console.log(`tttttttttttttttttttttttttttttt: ${message}`);
return message;
  }
  exports.clickDynamicLink = async function (page){    
    //let xpath = `xpath=//a[text()="${linkName}"]`;
    await page.locator('#dynamicLink').click();  
  }
  
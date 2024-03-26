var common = require('./../Common');

exports.clickSmallModalButton = async function (page ){    
    common.clickButton(page, '#showSmallModal');
  }

  exports.clickLargeModalButton = async function (page ){    
    common.clickButton(page, '#showLargeModal');
  }

  exports.closeModalByX = async function (page ){    
    common.clickButton(page, `xpath=//button[@class='close']/span[1]`);
  }
  exports.closeSmallModalByCloseButton = async function (page ){    
    common.clickButton(page, '#closeSmallModal');
  }

  
  exports.closeLargeModalByCloseButton = async function (page ){    
    common.clickButton(page, '#closeLargeModal');
  }

  exports.getModalHeaderText = async function (page ){    
    let xpath = `xpath=//div[@class='modal-header']/div`;
    const element = await page.$(xpath);
    const headerText = await (await element.getProperty('textContent')).jsonValue();
    console.log(`tttttttttttttttttttttttttttttt: ${headerText}`);
    return headerText;
  }

  exports.getModalBodyText = async function (page ){    
    let xpath = `xpath=//div[@class='modal-body']`;
    const element = await page.$(xpath);
    const bodyText = await (await element.getProperty('textContent')).jsonValue();
    console.log(`tttttttttttttttttttttttttttttt: ${bodyText}`);
    return bodyText;
  }
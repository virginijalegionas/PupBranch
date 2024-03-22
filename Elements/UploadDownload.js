
exports.uploadFile = async function (page, file){    
    const elementHandle = await page.$("input[type=file]");
await elementHandle.uploadFile(`c:\/${file}`);
//await page.click('selector-of-submit-button');  // might not be necessary
  }

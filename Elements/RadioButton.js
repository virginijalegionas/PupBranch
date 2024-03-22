exports.selectRadio = async function(page, radioName){
    let xpath = `xpath=//label[contains(text(),"${radioName}")]/preceding-sibling::input`;
  const radio = await page.$(xpath);
  await radio.click();
  
  }
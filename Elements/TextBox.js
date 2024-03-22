

  exports.inputTextBox = async function (page, textBoxName, textBoxValue) {
    let xpath = `xpath=//label[contains(text(), "${textBoxName}")]//parent::div/following-sibling::div/input | //label[contains(text(), "${textBoxName}")]//parent::div/following-sibling::div/textarea`;
    await page.locator(xpath).fill(textBoxValue);
  }
  
  
  
  exports.getTextBoxResults = async function(page){
   
    var results = new Array();
    const feedHandle = await page.$('#output');
    results = await feedHandle.$$eval('p.mb-1', nodes => nodes.map(n => n.innerText));
    //results = await page.$$(`xpath=//div[@id="output"]/div/p`);
    const l = results.length;
    for(a=0 ; a<l; a++){
    console.log(`results are: ${results[a]}`);
    }  
  }
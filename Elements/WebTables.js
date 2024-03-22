exports.inputFieldValue = async function (page, fieldName, fieldValue) {
    try{
    let xpath = `xpath=//label[contains(text(),"${fieldName}")]//parent::div//following-sibling::div/input`;
    await page.locator(xpath).fill(fieldValue);
    }
    catch (err){
        console.log(`there was an error caught: ${err}`);
    }
  }

  exports.searchInTheTable = async function (page, searchValue) {
    try{
    
    await page.locator("#searchBox").fill(searchValue);
    //await page.locator("#basic-addon2 > span").click();
    }
    catch (err){
        console.log(`there was an error caught: ${err}`);
    }
  }

  exports.clickEditInTableByFirstName = async function (page, firstName) {
    try{
    let xpath =`xpath=//div[contains(text(),"${firstName}")]//following-sibling::div/div/span[@title="Edit"]`;    
    await page.locator(xpath).click();
    }
    catch (err){
        console.log(`there was an error caught: ${err}`);
    }
  }
  exports.clickDeleteInTableByFirstName = async function (page, firstName) {
    try{
    let xpath =`xpath=//div[contains(text(),"${firstName}")]//following-sibling::div/div/span[@title="Delete"]`;    
    await page.locator(xpath).click();
    }
    catch (err){
        console.log(`there was an error caught: ${err}`);
    }
  }

exports.clickSubmitButton = async function(page){
    await page.locator("#submit").click();
    
}

exports.clickCloseButtonRegistrationForm = async function(page){
    let xpath = `xpath=//button[@class="close"]//span[1]`;
    await page.locator(xpath).click();
    
}

exports.clickAddButton = async function(page){    
    await page.locator("#addNewRecordButton").click();
    
}

exports.getTableData = async function(page){
   
    var tableHeader = new Array();
    //var rowResults = new Array();
    var tableResults = new Array();
    const headerHandle = await page.$('div.rt-thead.-header');
    tableHeader = await headerHandle.$$eval('div.rt-resizable-header-content', nodes => nodes.map(n => n.innerText));
    let hl = tableHeader.length;
    var rowHandle = new Array();
    rowHandle = await page.$$('div.rt-tr-group');    
    
    let rhl = rowHandle.legth;
    let a = 0;
    for(let column in rowHandle){
        var rowResults = await rowHandle[column].$$eval('div.rt-td', nodes => nodes.map(n => n.innerText));
        var rowData = new Object();
        //empty lines have some weird character in its fields
        if(rowResults[0].charCodeAt(0)!= 160){
        for(b=0;b<hl;b++){
           
            rowData[tableHeader[b]] = rowResults[b];;
            
}
tableResults.push(rowData);
}

a++;
}
       
    
    //var resultsHandle = new Array();
    
    
    
    
    //results = await page.$$(`xpath=//div[@id="output"]/div/p`);
    const l = tableHeader.length;
    for(let rr in tableResults){
        for (const [key, value] of Object.entries(tableResults[rr])) {
            console.log(key, value);
          }
    }  
  }

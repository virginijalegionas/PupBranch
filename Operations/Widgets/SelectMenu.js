exports.selectFromOldStyleMenu = async function (page, selectValue) {
    const menu = await page.$("#oldSelectMenu");
    //text and value are different, select option chooses by value. first need to identify value by text
    let colorXpath = `xpath=//option[contains(text(),"${selectValue}")]`;
    let selectorColorValue = await page.$eval(colorXpath, n => n.getAttribute("value"));
    await menu.select(selectorColorValue);
}

exports.getOldSelectMenuSelectedValues = async function (page) {
    const option = await page.$eval("#oldSelectMenu", node => node.value);
    //I need Text value, not a value, getting text according to the value
    let xpath = `xpath=//*[@id='oldSelectMenu']/option[@value='${option}']`;
    let selectedValue = await page.$eval(xpath, n => n.innerText);
    return selectedValue;
}

exports.selectWithGroupValue = async function (page, value) {
    const drop = await page.$("#withOptGroup");
    await drop.click();
    const dropdown = await page.$(`xpath=//div[contains(text(),"${value}")]`);
    await dropdown.click();
}

exports.getWithGroupValue = async function (page) {
    let xpath = `xpath=//div[@id = 'withOptGroup']//div[@class=' css-1uccc91-singleValue']`;
    let selectedValue = await page.$eval(xpath, n => n.innerText);
    return selectedValue;
}

exports.selectOneValue = async function (page, value) {
    const drop = await page.$("#selectOne");
    await drop.click();
    const dropdown = await page.$(`xpath=//div[contains(text(),"${value}")]`);
    await dropdown.click();
}

exports.getSelectOneValue = async function (page) {
    let xpath = `xpath=//div[@id = 'selectOne']//div[@class=' css-1uccc91-singleValue']`;
    let selectedValue = await page.$eval(xpath, n => n.innerText);
    return selectedValue;
}

exports.selectMultiselectDropDown = async function (page, value) {
    let xpath = `xpath=//div/p/b[contains(text(), 'Multiselect drop down')]/parent::p/parent::div//div[@class = 'css-1g6gooi']//input`;
    let searchString = await value.at(0);
    await page.locator(xpath).fill(searchString);
    await page.evaluate(() => {
        window.scrollTo(0, document.body.scrollHeight);
    });
    const subjectDropdown = await page.$(`xpath=//div[contains(text(),"${value}")]`);
    await subjectDropdown.click();
}

exports.getMultiselectDropDownValues = async function (page) {
    let xpath = `xpath=//div/p/b[contains(text(), 'Multiselect drop down')]/parent::p/parent::div//div[@class = ' css-2b097c-container']`;
    let resultsElement = await page.$(xpath);
    results = await resultsElement.$$eval('.css-12jo7m5', nodes => nodes.map(n => n.innerText));    
    return results;
}

exports.selectStandardMultiSelect = async function (page, selectValue) {
    const menu = await page.$("#cars");
    //text and value are case different
    let lowCaseSelectValue = selectValue.map(x => x.toLowerCase());
    //unpack, passing multiple values for select
    await menu.select(...lowCaseSelectValue);
}

exports.getStandardMultiSelectValues = async function (page) {
    const selectedOptions = await page.evaluate(() => {
        const select = document.getElementById('cars');
        return Array.from(select.selectedOptions).map(option => option.value);
    });
    return selectedOptions;
}
exports.addNewRecord = async function (page, fName, lName, age, email, salary, department) {
    await exports.clickAddButton(page);
    await exports.inputFirstName(page, fName);
    await exports.inputLastName(page, lName);
    await exports.inputAge(page, age);
    await exports.inputEmail(page, email);
    await exports.inputSalary(page, salary);
    await exports.inputDepartment(page, department);
    await exports.clickSubmitButton(page);
}

exports.editRecordByFirstName = async function (page, fName, updatedFName, updatedLName, updatedAge, updatedEmail, updatedSalary, updatedDepartment) {
    await exports.clickEditInTableByFirstName(page, fName);
    await exports.inputFirstName(page, updatedFName);
    await exports.inputLastName(page, updatedLName);
    await exports.inputAge(page, updatedAge);
    await exports.inputEmail(page, updatedEmail);
    await exports.inputSalary(page, updatedSalary);
    await exports.inputDepartment(page, updatedDepartment);
    await exports.clickSubmitButton(page);
}

exports.inputFirstName = async function (page, fieldValue) {
    try {
        let xpath = `xpath=//label[contains(text(),"First Name")]//parent::div//following-sibling::div/input`;
        await page.locator(xpath).fill(fieldValue);
    }
    catch (err) {
        console.log(`there was an error caught: ${err}`);
    }
}

exports.inputLastName = async function (page, fieldValue) {
    try {
        let xpath = `xpath=//label[contains(text(),"Last Name")]//parent::div//following-sibling::div/input`;
        await page.locator(xpath).fill(fieldValue);
    }
    catch (err) {
        console.log(`there was an error caught: ${err}`);
    }
}

exports.inputEmail = async function (page, fieldValue) {
    try {
        let xpath = `xpath=//label[contains(text(),"Email")]//parent::div//following-sibling::div/input`;
        await page.locator(xpath).fill(fieldValue);
    }
    catch (err) {
        console.log(`there was an error caught: ${err}`);
    }
}

exports.inputAge = async function (page, fieldValue) {
    try {
        let xpath = `xpath=//label[contains(text(),"Age")]//parent::div//following-sibling::div/input`;
        await page.locator(xpath).fill(fieldValue);
    }
    catch (err) {
        console.log(`there was an error caught: ${err}`);
    }
}

exports.inputSalary = async function (page, fieldValue) {
    try {
        let xpath = `xpath=//label[contains(text(),"Salary")]//parent::div//following-sibling::div/input`;
        await page.locator(xpath).fill(fieldValue);
    }
    catch (err) {
        console.log(`there was an error caught: ${err}`);
    }
}

exports.inputDepartment = async function (page, fieldValue) {
    try {
        let xpath = `xpath=//label[contains(text(),"Department")]//parent::div//following-sibling::div/input`;
        await page.locator(xpath).fill(fieldValue);
    }
    catch (err) {
        console.log(`there was an error caught: ${err}`);
    }
}

exports.searchInTheTable = async function (page, searchValue) {
    try {
        await page.locator("#searchBox").fill(searchValue);
    }
    catch (err) {
        console.log(`there was an error caught: ${err}`);
    }
}

exports.clickEditInTableByFirstName = async function (page, firstName) {
    try {
        let xpath = `xpath=//div[contains(text(),"${firstName}")]//following-sibling::div/div/span[@title="Edit"]`;
        await page.locator(xpath).click();
    }
    catch (err) {
        console.log(`there was an error caught: ${err}`);
    }
}

exports.clickDeleteInTableByFirstName = async function (page, firstName) {
    try {
        let xpath = `xpath=//div[contains(text(),"${firstName}")]//following-sibling::div/div/span[@title="Delete"]`;
        await page.locator(xpath).click();
    }
    catch (err) {
        console.log(`there was an error caught: ${err}`);
    }
}

exports.clickSubmitButton = async function (page) {
    await page.locator("#submit").click();
}

exports.clickCloseButtonRegistrationForm = async function (page) {
    let xpath = `xpath=//button[@class="close"]//span[1]`;
    await page.locator(xpath).click();
}

exports.clickAddButton = async function (page) {
    await page.locator("#addNewRecordButton").click();
}

exports.getTableData = async function (page) {
    var tableHeader = new Array();
    var tableResults = new Array();
    const headerHandle = await page.$('div.rt-thead.-header');
    tableHeader = await headerHandle.$$eval('div.rt-resizable-header-content', nodes => nodes.map(n => n.innerText));
    let hl = tableHeader.length;
    var rowHandle = new Array();
    rowHandle = await page.$$('div.rt-tr-group');    
    for (let column in rowHandle) {
        var rowResults = await rowHandle[column].$$eval('div.rt-td', nodes => nodes.map(n => n.innerText));
        var rowData = new Object();
        //empty lines have some weird character in its fields
        if (rowResults[0].charCodeAt(0) != 160) {
            for (b = 0; b < hl; b++) {
                rowData[tableHeader[b]] = rowResults[b];
            }
            tableResults.push(rowData);
        }
    }
    return tableResults;
}

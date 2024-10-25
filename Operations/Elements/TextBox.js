exports.makeXpath = async function (textBoxName, isTextArea) {
    let xpath;
    if (isTextArea == false) {
        xpath = `xpath=//label[contains(text(), "${textBoxName}")]//parent::div/following-sibling::div/input`;
    }
    else {
        xpath = `xpath=//label[contains(text(), "${textBoxName}")]//parent::div/following-sibling::div/textarea`;
    }
    return xpath;
}

exports.inputFullName = async function (page, textBoxValue) {
    let xpath = await exports.makeXpath("Full Name", false);
    await page.locator(xpath).fill(textBoxValue);
}

exports.inputEmail = async function (page, textBoxValue) {
    let xpath = await exports.makeXpath("Email", false);
    await page.locator(xpath).fill(textBoxValue);
}

exports.inputCurrentAddress = async function (page, textBoxValue) {
    let xpath = await exports.makeXpath("Current Address", true);
    await page.locator(xpath).fill(textBoxValue);
}

exports.inputPermanentAddress = async function (page, textBoxValue) {
    let xpath = await exports.makeXpath("Permanent Address", true);
    await page.locator(xpath).fill(textBoxValue);
}

exports.getTextBoxResults = async function (page) {
    var results = new Array();
    const feedHandle = await page.$('#output');
    results = await feedHandle.$$eval('p.mb-1', nodes => nodes.map(n => n.innerText));
    var correctResults = new Array();
    for (let i in results) {
        let index = results[i].indexOf(":");
        let correctElement = results[i].substring(index + 1);
        correctResults.push(correctElement);
    }
    return correctResults;
}

exports.clickSubmit = async function (page) {
    const targetElement = await page.$('#submit');
    // Scrolling page down
    await page.evaluate(() => {
        window.scrollTo(0, document.body.scrollHeight);
    });
    await targetElement.click();
}

exports.getEmailClassAttributeValue = async function (page) {
    let selector = "#userEmail";
    await page.waitForSelector(selector, { visible: true });
    let classAttributeValue = await page.$eval(selector, n => n.getAttribute("class"));
    return classAttributeValue;
}


exports.selectRadio = async function (page, radioName) {
    let xpath = `xpath=//label[contains(text(),"${radioName}")]/preceding-sibling::input`;
    const radio = await page.$(xpath);
    await radio.click();
}

exports.getSelectedRadioValue = async function (page) {
    let selector = `.text-success`;
    let radioValue = await page.$eval(selector, el => el.innerText);
    return radioValue;
}

exports.isRadioSelectable = async function (page, radioName) {
    let radioXpath = `xpath=//label[contains(text(),'${radioName}')]//preceding-sibling::input`;
    let classValue = await page.$eval(radioXpath, el => el.getAttribute("class"))
    return classValue != "custom-control-input disabled";
}
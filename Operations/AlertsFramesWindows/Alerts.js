exports.clickAlertButton = async function (page) {
    let xpath = `xpath=//button[@id = 'alertButton']`;
    await page.locator(xpath).click();
}

exports.clickAlertIn5SecondButton = async function (page) {
    let xpath = `xpath=//button[@id = 'timerAlertButton']`;
    await page.locator(xpath).click();
}

exports.clickAlertWithConfirmButton = async function (page) {
    let xpath = `xpath=//button[@id = 'confirmButton']`;
    await page.locator(xpath).click();
}

exports.clickAlertWithPromptButton = async function (page) {
    let xpath = `xpath=//button[@id = 'promtButton']`;
    await page.locator(xpath).click();
}

exports.getConfirmResult = async function (page) {
    const element = await page.$("#confirmResult");
    const message = await (await element.getProperty('textContent')).jsonValue();
    return message;
}
exports.getPromptResult = async function (page) {
    const element = await page.$("#promptResult");
    const message = await (await element.getProperty('textContent')).jsonValue();
    return message;
}

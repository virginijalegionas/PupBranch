exports.clickMeButton = async function (page) {
    let xpath = `xpath=//button[text()="Click Me"]`;
    await page.locator(xpath).click();
}

exports.clickRightButton = async function (page) {
    let xpath = `xpath=//button[text()="Right Click Me"]`;
    await page.click(xpath, { button: 'right' });
}

exports.clickDoubleButton = async function (page) {
    let xpath = `xpath=//button[text()="Double Click Me"]`;
    await page.click(xpath, { clickCount: 2 });
}

exports.getClickMeMessage = async function (page) {
    const element = await page.$("#dynamicClickMessage");
    const message = await (await element.getProperty('textContent')).jsonValue();
    return message;
}

exports.getRightClickMessage = async function (page) {
    const element = await page.$("#rightClickMessage");
    const message = await (await element.getProperty('textContent')).jsonValue();
    return message;
}

exports.getDoubleClickMessage = async function (page) {
    const element = await page.$("#doubleClickMessage");
    const message = await (await element.getProperty('textContent')).jsonValue();
    return message;
}
exports.clickSmallModalButton = async function (page) {
    await page.locator("#showSmallModal").click();
}

exports.clickLargeModalButton = async function (page) {
    await page.locator("#showLargeModal").click();
}

exports.closeModalByX = async function (page) {
    await page.locator("button.close > span").click();
}

exports.closeSmallModalByCloseButton = async function (page) {
    await page.locator("#closeSmallModal").click();
}

exports.closeLargeModalByCloseButton = async function (page) {
    await page.locator("#closeLargeModal").click();
}

exports.getModalHeaderText = async function (page) {
    let xpath = `xpath=//div[@class='modal-header']/div`;
    const headerText = await page.$eval(xpath, n => n.innerText);
    return headerText;
}

exports.getModalBodyText = async function (page) {
    let xpath = `xpath=//div[@class='modal-body']`;
    const element = await page.$(xpath);
    const bodyText = await (await element.getProperty('textContent')).jsonValue();
    return bodyText;
}
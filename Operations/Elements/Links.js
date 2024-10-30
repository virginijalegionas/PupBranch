exports.clickLinkCreated = async function (page) {
    await page.locator("#created").click();
}

exports.clickLinkNoContent = async function (page) {
    await page.locator("#no-content").click();
}

exports.clickLinkMoved = async function (page) {
    await page.locator("#moved").click();
}

exports.clickLinkBadRequest = async function (page) {
    await page.locator("#bad-request").click();
}

exports.clickLinkUnauthorized = async function (page) {
    await page.locator("#unauthorized").click();
}

exports.clickLinkForbidden = async function (page) {
    await page.locator("#forbidden").click();
}

exports.clickLinkNotFound = async function (page) {
    await page.locator("#invalid-url").click();
}

exports.getLinkResponseMessage = async function (page) {
    let selector = "#linkResponse";
    await page.waitForSelector(selector, { visible: true });
    let message = await page.$eval(selector, n => n.innerText);
    return message;
}

exports.clickDynamicLink = async function (page) {
    await page.locator('#dynamicLink').click();
}

exports.getPageAddress = async function (page) {
    let newTab = await page.newTab();
    let pageUrl = await newTab.url();
    return pageUrl;
}
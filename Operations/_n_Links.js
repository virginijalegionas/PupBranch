exports.clickLink = async function (page, linkName) {
	let xpath = `xpath=//a[text()="${linkName}"]`;
	await page.locator(xpath).click();
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
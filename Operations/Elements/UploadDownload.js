var baseOperations = require('../../BaseOperations');

exports.uploadFile = async function (page, file) {
	const elementHandle = await page.$("input[type=file]");
	await elementHandle.uploadFile(`c:\/${file}`);
}

exports.getUploadedFilePath = async function (page) {
	let selector = "#uploadedFilePath";
	await page.waitForSelector(selector, { visible: true });
	let uploadedPath = await page.$eval(selector, n => n.innerText);
	return uploadedPath;
}

exports.clickDowloadButton = async function (page) {
	await baseOperations.clickButton(page, "#downloadButton");
}

exports.clickButton = async function (page, buttonMeaning) {

	let xpath = `xpath=//span[contains(text(), '${buttonMeaning}')]/parent::div/following-sibling::div/button`;
	await page.locator(xpath).click();
}

exports.acceptAllert = async function (page, alertName) {
	page.on('dialog', async dialog => {

		console.log(dialog.type());

		console.log(dialog.message());

		await dialog.accept();

	});

	exports.clickButton(page, alertName);

}
exports.dismissAllert = async function (page, alertName) {
	page.on('dialog', async dialog => {

		console.log(dialog.type());

		console.log(dialog.message());

		await dialog.dismiss();

	});

	exports.clickButton(page, alertName);

}
exports.addTextAllert = async function (page, alertName, alertText) {
	page.on('dialog', async dialog => {

		console.log(dialog.type());

		console.log(dialog.message());
		await dialog.accept(`${alertText}`);
		// await dialog.accept();

	});

	exports.clickButton(page, alertName);

}
exports.getConfirmResult = async function (page) {
	const element = await page.$("#confirmResult");
	const message = await (await element.getProperty('textContent')).jsonValue();
	console.log(`tttttttttttttttttttttttttttttt: ${message}`);
	return message;
}
//   exports.getPromptResult = async function (page){
//     const element = await page.$("#promptResult");
// const message = await (await element.getProperty('textContent')).jsonValue();
// console.log(`tttttttttttttttttttttttttttttt: ${message}`);
// return message;
//   }
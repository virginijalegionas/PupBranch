exports.inputMobile = async function (page, textBoxValue) {
	let xpath = `xpath=//label[contains(text(), "Mobile")]//parent::div/following-sibling::div/input`
	await page.locator(xpath).fill(textBoxValue);
}

exports.inputEmail = async function (page, textBoxValue) {
	let xpath = `xpath=//label[contains(text(), "Email")]//parent::div/following-sibling::div/input`
	await page.locator(xpath).fill(textBoxValue);
}

exports.inputCurrentAddress = async function (page, textBoxValue) {
	let xpath = `xpath=//label[contains(text(), "Current Address")]//parent::div/following-sibling::div/textarea`;
	await page.locator(xpath).fill(textBoxValue);
}

exports.inputFirstName = async function (page, value) {
	let selector = `#firstName`;
	await page.locator(selector).fill(value);
}

exports.inputLastName = async function (page, value) {
	let selector = `#lastName`;
	await page.locator(selector).fill(value);
}

exports.choosePicture = async function (page, file) {
	const elementHandle = await page.$("input[type=file]");
	await elementHandle.uploadFile(`c:\/${file}`);
}

exports.selectDateOfBirth = async function (page, birthDate) {
	const calendar = await page.$("#dateOfBirthInput");
	await calendar.click();

	const yearValue = birthDate.getFullYear();
	const year = await page.$(".react-datepicker__year-select");
	await year.select(yearValue.toString());

	let selectorMonthValue = birthDate.getMonth();
	const month = await page.$(".react-datepicker__month-select");
	await month.select(selectorMonthValue.toString());

	let dayValue = birthDate.getDate();
	let dayXpath = `xpath=//div[not(contains(@class, 'outside-month')) and text()='${dayValue}' ]`;
	const day = await page.$(dayXpath);
	await day.click();
}

exports.selectGender = async function (page, value) {
	const mgender = await page.$(`div > input[value="${value}"]`);
	await mgender.click();
}

exports.selectHobbies = async function (page, value) {
	let xpath = `xpath=//label[contains(text(),'${value}')]/preceding-sibling::input`;
	const hobby = await page.$(xpath);
	await hobby.click();
}

exports.selectState = async function (page, value) {
	const state = await page.$("#state");
	await state.click();
	const stateDropdown = await page.$(`xpath=//div[contains(text(),"${value}")]`);
	await stateDropdown.click();
}

exports.selectCity = async function (page, value) {
	const city = await page.$("#city");
	await city.click();
	const cityDropdown = await page.$(`xpath=//div[contains(text(),"${value}")]`);
	await cityDropdown.click();
}

exports.selectSubjects = async function (page, value) {
	let xpath = `xpath=//div[@id="subjectsContainer"]//input`;
	let searchString = await value.at(0);
	await page.locator(xpath).fill(searchString);
	await page.evaluate(() => {
		window.scrollTo(0, document.body.scrollHeight);
	});
	const subjectDropdown = await page.$(`xpath=//div[contains(text(),"${value}")]`);
	await subjectDropdown.click();
}

exports.clickSubmit = async function (page) {
	const targetElement = await page.$('#submit');
	await targetElement.click();
}

exports.closeResultsForm = async function (page) {
	await page.locator("#closeLargeModal").click();
}

exports.getFormData = async function (page) {
	var tableResults = new Array();
	var rowsElement = await page.$$('xpath=//table/tbody/tr');
	for (let element in rowsElement) {
		var rowsLabel = await rowsElement[element].$$eval('td:first-child', nodes => nodes.map(n => n.innerText));
		var rowsValue = await rowsElement[element].$$eval('td:last-child', nodes => nodes.map(n => n.innerText));

		tableResults[rowsLabel] = rowsValue;
	}
	return tableResults;
}

exports.formatDateForResultsValidation = async function (date) {
	let year = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(date);
	let month = new Intl.DateTimeFormat('en', { month: 'long' }).format(date);
	let day = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(date);
	return `${day} ${month},${year}`;
}



////Accordian ////
exports.expandAccordian = async function (page, value) {
	let elementXpath = `xpath=//div[contains(text(), '${value}')]//following-sibling::div`;
	let classValue = await page.$eval(elementXpath, el => el.getAttribute("class"))
	if (classValue == "collapse") {
		let elemClickxpath = `xpath=//div[contains(text(), '${value}')]`;
		await page.locator(elemClickxpath).click();
	}
	else {
		console.log(`Accordian: "${value}" is already expanded`);
	}
}
exports.collapseAccordian = async function (page, value) {
	let elementXpath = `xpath=//div[contains(text(), '${value}')]//following-sibling::div`;
	let classValue = await page.$eval(elementXpath, el => el.getAttribute("class"))
	if (classValue == "collapse show") {
		let elemClickxpath = `xpath=//div[contains(text(), '${value}')]`;
		await page.locator(elemClickxpath).click();
	}
	else {
		console.log(`Accordian: "${value}" is already expanded`);
	}
}
exports.getAccordianText = async function (page, accordianValue) {
	let elementXpath = `xpath=//div[contains(text(), '${accordianValue}')]//following-sibling::div//div[@class='card-body']`;
	const textElement = await page.$(elementXpath);
	let allParagraphsInTextElement = await textElement.$$eval('p', nodes => nodes.map(n => n.innerText));

	//combine all paragraphs into one string
	let text = "";
	if (allParagraphsInTextElement.length > 1) {
		for (let element in allParagraphsInTextElement) {
			text = text + allParagraphsInTextElement.at(element);
		}
		return text;
	}
	else {
		return allParagraphsInTextElement[0];
	}
}
///////

//Progress Bar//
exports.clickStartStop = async function (page) {
	await page.locator('#startStopButton').click();
}

exports.getProgressValue = async function (page) {
	let progressValue = await page.$eval('.progress-bar', el => el.getAttribute("aria-valuenow"));
	return progressValue;
}
///// Tabs ///
exports.OpenTab = async function (page, tab) {
	let tabXpath = `xpath=//nav/a[contains(text(), '${tab}')]`;
	let ariaSelected = await page.$eval(tabXpath, el => el.getAttribute("aria-selected"))
	if (ariaSelected == 'false') {
		await page.locator(tabXpath).click();
	}
	else {
		console.log(`tab: ${tab} is already opened`);
	}
}
exports.getTabText = async function (page, tab) {
	let tabLowerCase = tab.toLowerCase();
	let elementXpath = `xpath=//div[@id='demo-tabpane-${tabLowerCase}']`;
	const textElement = await page.$(elementXpath);
	let allParagraphsInTextElement = await textElement.$$eval('p', nodes => nodes.map(n => n.innerText));

	//combine all paragraphs into one string
	let text = "";
	if (allParagraphsInTextElement.length > 1) {
		for (let element in allParagraphsInTextElement) {
			text = text + allParagraphsInTextElement.at(element);
		}
		return text;
	}
	else {
		return allParagraphsInTextElement[0];
	}
}
////Select Menu//////
exports.selectFromOldStyleMenu = async function (page, selectValue) {
	const menu = await page.$("#oldSelectMenu");
	//text and value are different, select option chooses by value. first need to identify value by text
	let colorXpath = `xpath=//option[contains(text(),"${selectValue}")]`;
	let selectorColorValue = await page.$eval(colorXpath, n => n.getAttribute("value"));
	await menu.select(selectorColorValue);
}
exports.selectWithGroupValue = async function (page, value) {
	const drop = await page.$("#withOptGroup");
	await drop.click();
	const dropdown = await page.$(`xpath=//div[contains(text(),"${value}")]`);
	await dropdown.click();
}

exports.selectOneValue = async function (page, value) {
	const drop = await page.$("#selectOne");
	await drop.click();
	const dropdown = await page.$(`xpath=//div[contains(text(),"${value}")]`);
	await dropdown.click();
}

exports.selectMultiselectDropDown = async function (page, value) {
	let xpath = `xpath=//div/p/b[contains(text(), 'Multiselect drop down')]/parent::p/parent::div//div[@class = 'css-1g6gooi']//input`;
	let searchString = await value.at(0);
	await page.locator(xpath).fill(searchString);
	await page.evaluate(() => {
		window.scrollTo(0, document.body.scrollHeight);
	});
	const subjectDropdown = await page.$(`xpath=//div[contains(text(),"${value}")]`);
	await subjectDropdown.click();
}
exports.selectStandardMultiSelect = async function (page, selectValue) {
	const menu = await page.$("#cars");
	//text and value are case different
	let lowCaseSelectValue = selectValue.map(x => x.toLowerCase());
	await menu.select(...lowCaseSelectValue);
}

exports.getOldSelectMenuSelectedValues = async function (page) {
	const option = await page.$eval("#oldSelectMenu", node => node.value);
	//I need Text value, not a value, getting text according to the value
	let xpath = `xpath=//*[@id='oldSelectMenu']/option[@value='${option}']`;
	let selectedValue = await page.$eval(xpath, n => n.innerText);
	return selectedValue;
}

exports.getStandardMultiSelectValues = async function (page) {
	const selectedOptions = await page.$eval("#cars", node => node.values);
	let selectedValues = [];
	const feedHandle = await page.$('#cars');
	let results = await feedHandle.$$eval('option', nodes => nodes.map(n => n.value));
	for (let option of results) {
		if (option.hasAttribute('selected')) {

			selectedValues.push(option.value);
		}

	}
	//   //I need Text value, not a value, getting text according to the value
	// let xpath = `xpath=//*[@id='oldSelectMenu']/option[@value='${option}']`;
	// let selectedValue = await page.$eval(xpath, n => n.innerText);
	// return selectedValue;
	// 

	// const f = await page.$('#cars')  
	// //wait for sometime  
	// //get value selected
	// const v = await (await f.getProperty("value")).jsonValue()
	// console.log(v)

	console.log(`aaaaaaaaaaa: ${selectedOptions}`);
}

exports.getMultiselectDropDownValues = async function (page) {
	let xpath = `xpath=//div/p/b[contains(text(), 'Multiselect drop down')]/parent::p/parent::div//div[@class = ' css-2b097c-container']`;
	let resultsElement = await page.$(xpath);
	results = await resultsElement.$$eval('.css-12jo7m5', nodes => nodes.map(n => n.innerText));
	return results;
}

exports.getSelectOneValue = async function (page) {
	let xpath = `xpath=//div[@id = 'selectOne']//div[@class=' css-1uccc91-singleValue']`;
	let selectedValue = await page.$eval(xpath, n => n.innerText);
	return selectedValue;
}

exports.getWithGroupValue = async function (page) {
	let xpath = `xpath=//div[@id = 'withOptGroup']//div[@class=' css-1uccc91-singleValue']`;
	let selectedValue = await page.$eval(xpath, n => n.innerText);
	return selectedValue;
}
////////////




exports.expandHomeTreeList = async function (page) {
	await exports.expandChildList(page, "Home");
}

exports.collapseHomeTreeList = async function (page) {
	await exports.collapseChildList(page, "Home");
}

exports.collapseChildList = async function (page, listName) {
	try {
		let listXpath = `xpath=//span[contains(text(),"${listName}")]//ancestor::span[@class="rct-text"]/button/*[local-name() = 'svg']`;
		let classValue = await page.$eval(listXpath, el => el.getAttribute("class"))
		if (classValue == "rct-icon rct-icon-expand-open") {
			let buttonXpath = `xpath=//span[contains(text(),"${listName}")]//ancestor::span[@class="rct-text"]/button`;
			await page.locator(buttonXpath).click();
		}
		else {
			console.log(`${listName} Tree List is already collapsed`);
		}
	}
	catch (err) {
		console.log(`there was an error caught: ${err}`);
	}
}

exports.expandChildList = async function (page, listName) {
	try {
		let listXpath = `xpath=//span[contains(text(),"${listName}")]//ancestor::span[@class="rct-text"]/button/*[local-name() = 'svg']`;
		let classValue = await page.$eval(listXpath, el => el.getAttribute("class"))
		if (classValue == "rct-icon rct-icon-expand-close") {
			let buttonXpath = `xpath=//span[contains(text(),"${listName}")]//ancestor::span[@class="rct-text"]/button`;
			await page.locator(buttonXpath).click();
		}
		else {
			console.log(`${listName} Tree List is already expanded`);
		}
	}
	catch (err) {
		console.log(`there was an error caught: ${err}`);
	}
}

exports.checkNodeCheckBox = async function (page, nodeName) {
	try {
		let checkBoxXpath = `xpath=//span[contains(text(),"${nodeName}")]//preceding-sibling::span[@class="rct-checkbox"]`;
		let nodeXpath = `xpath=//span[contains(text(),"${nodeName}")]//preceding-sibling::span[@class="rct-checkbox"]/*[local-name() = 'svg']`;
		let classValue = await page.$eval(nodeXpath, el => el.getAttribute("class"))
		if (classValue == "rct-icon rct-icon-uncheck") {
			await page.locator(checkBoxXpath).click();
		}
		else if (classValue == "rct-icon rct-icon-half-check") {
			await page.locator(checkBoxXpath).click();
		}
		else {
			console.log(`${nodeName} node is already checked`);
		}
	}
	catch (err) {
		console.log(`there was an error caught: ${err}`);
	}
}

exports.unCheckNodeCheckBox = async function (page, nodeName) {
	try {
		let checkBoxXpath = `xpath=//span[contains(text(),"${nodeName}")]//preceding-sibling::span[@class="rct-checkbox"]`;
		let nodeXpath = `xpath=//span[contains(text(),"${nodeName}")]//preceding-sibling::span[@class="rct-checkbox"]/*[local-name() = 'svg']`;
		let classValue = await page.$eval(nodeXpath, el => el.getAttribute("class"))
		if (classValue == "rct-icon rct-icon-check") {
			await page.locator(checkBoxXpath).click();
		}
		else if (classValue == "rct-icon rct-icon-half-check") {
			await page.locator(checkBoxXpath).click();
			await page.locator(checkBoxXpath).click();
		}
		else {
			console.log(`${nodeName} node is already unchecked`);
		}
	}
	catch (err) {
		console.log(`there was an error caught: ${err}`);
	}
}

exports.isNodeChecked = async function (page, nodeName) {
	let nodeXpath = `xpath=//span[contains(text(),"${nodeName}")]//preceding-sibling::span[@class="rct-checkbox"]/*[local-name() = 'svg']`;
	let classValue = await page.$eval(nodeXpath, el => el.getAttribute("class"))
	if (classValue == "rct-icon rct-icon-check") {
		return "checked";
	}
	else if (classValue == "rct-icon rct-icon-half-check") {
		return "halfChecked";
	}
	else {
		return "unChecked";
	}
}

require('dotenv').config();
const puppeteer = require('puppeteer');
var widgets = require('../Operations/_n_Widgets.js');
var common = require('../Common.js');
var baseOperations = require('../BaseOperations.js');
const expect = require('expect.js');

describe('Widget Tests', function () {
	let page;
	let browser;
	this.timeout(100000);
	const browserOptions = {
		headless: false,
		defaultViewport: false,
		args: ['--start-maximized']
	}

	beforeEach(async function () {
		browser = await puppeteer.launch(browserOptions);
		page = await browser.newPage();
		await page.goto(process.env.pageLink);
	});

	/* it(`Accordian Test`, async function () {
		await baseOperations.clickBlockInHomePage(page, "Widgets");
		await baseOperations.clickElementInMenu(page, "Accordian");

		await widgets.expandAccordian(page, "What is Lorem Ipsum");
		await widgets.collapseAccordian(page, "What is Lorem Ipsum");
		await widgets.expandAccordian(page, "Where does it come from");
		let text = await widgets.getAccordianText(page, "Where");
		let expectedText = "The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested.";
		expect(text).contain(expectedText);
	});

	it(`Progress Test`, async function () {
		await baseOperations.clickBlockInHomePage(page, "Widgets");
		await baseOperations.clickElementInMenu(page, "Progress Bar");

		await widgets.clickStartStop(page);
		await common.wait(2);
		await widgets.clickStartStop(page);
		let progressValue = await widgets.getProgressValue(page);
		expect(progressValue).to.be.within(15, 23);
		//one more round
		await widgets.clickStartStop(page);
		await common.wait(2);
		await widgets.clickStartStop(page);
		progressValue = await widgets.getProgressValue(page);
		expect(progressValue).to.be.within(35, 45);
	});

	it(`Tabs Test`, async function () {
		await baseOperations.clickBlockInHomePage(page, "Widgets");
		await baseOperations.scrollToBottom(page);
		await baseOperations.clickElementInMenu(page, "Tabs");
		await baseOperations.scrollToTop(page);
		await widgets.OpenTab(page, "Origin");
		let originTabText = await widgets.getTabText(page, "Origin");
		let expectedOriginTabText = "The standard chunk of Lorem Ipsum used since the 1500s";
		expect(originTabText).to.contain(expectedOriginTabText);
	});

	it(`Select Menu Test`, async function () {
		await baseOperations.clickBlockInHomePage(page, "Widgets");
		await baseOperations.scrollToBottom(page);
		await baseOperations.clickElementInMenu(page, "Select Menu");

		// let withGroupValue = "Group 1, option 2";
		// await widgets.selectWithGroupValue(page, withGroupValue);
		// let selectedWithGroupValue = await widgets.getWithGroupValue(page);
		// expect(withGroupValue).to.eql(selectedWithGroupValue);

		// let oneValue = "Mrs.";
		// await widgets.selectOneValue(page, oneValue);
		// let selectedOneValue = await widgets.getSelectOneValue(page);
		// expect(oneValue).to.eql(selectedOneValue);

		// let oldStyleValue = "Voilet";
		// await widgets.selectFromOldStyleMenu(page, oldStyleValue);
		// let selectedOldStyleValue =  await widgets.getOldSelectMenuSelectedValues(page);
		//  expect(oldStyleValue).to.eql(selectedOldStyleValue); 

		// let multiSelectValue1 = "Green";
		// let multiSelectValue2 = "Blue";    
		//  await widgets.selectMultiselectDropDown(page, multiSelectValue1);
		//  await widgets.selectMultiselectDropDown(page, multiSelectValue2);
		// let selectedMultiSelectValue = await widgets.getMultiselectDropDownValues(page);
		// expect(selectedMultiSelectValue).contain(multiSelectValue1); 
		// expect(selectedMultiSelectValue).contain(multiSelectValue2); 

		baseOperations.scrollToBottom(page);
		let carsSelect = ["Volvo", "Audi"];
		await widgets.selectStandardMultiSelect(page, carsSelect);
		await widgets.getStandardMultiSelectValues(page);

		//await widgets.getSatndardMultiSelectValues(page);
		// let await widgets.getMultiselectDropDownValues(page);
	});
 */
	afterEach(async function () {
		await browser.close();
	});
});
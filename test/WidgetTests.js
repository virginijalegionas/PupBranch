require('dotenv').config();
const puppeteer = require('puppeteer');
var accordian = require('../Operations/Widgets/Accordian.js');
var progressBar = require('../Operations/Widgets/ProgressBar.js');
var tabs = require('../Operations/Widgets/Tabs.js');
var selectMenu = require('../Operations/Widgets/SelectMenu.js');
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

    it(`Accordian Test`, async function () {
        await baseOperations.clickBlockInHomePage(page, "Widgets");
        await baseOperations.clickElementInMenu(page, "Accordian");

        await accordian.expandAccordian(page, "What is Lorem Ipsum");
        await accordian.collapseAccordian(page, "What is Lorem Ipsum");
        await accordian.expandAccordian(page, "Where does it come from");
        let text = await accordian.getAccordianText(page, "Where");
        let expectedText = "The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested.";
        expect(text).contain(expectedText);
    });

    it(`Progress Test`, async function () {
        await baseOperations.clickBlockInHomePage(page, "Widgets");
        await baseOperations.clickElementInMenu(page, "Progress Bar");

        await progressBar.clickStartStop(page);
        await common.wait(2);
        await progressBar.clickStartStop(page);
        let progressValue = await progressBar.getProgressValue(page);
        expect(progressValue).to.be.within(15, 23);
        //one more round
        await progressBar.clickStartStop(page);
        await common.wait(2);
        await progressBar.clickStartStop(page);
        progressValue = await progressBar.getProgressValue(page);
        expect(progressValue).to.be.within(35, 45);
    });

    it(`Tabs Test`, async function () {
        await baseOperations.clickBlockInHomePage(page, "Widgets");
        await baseOperations.scrollToBottom(page);
        await baseOperations.clickElementInMenu(page, "Tabs");
        await baseOperations.scrollToTop(page);
        await tabs.OpenTab(page, "Origin");
        let originTabText = await tabs.getTabText(page, "Origin");
        let expectedOriginTabText = "The standard chunk of Lorem Ipsum used since the 1500s";
        expect(originTabText).to.contain(expectedOriginTabText);
    });

    it(`Select Menu Test`, async function () {
        await baseOperations.clickBlockInHomePage(page, "Widgets");
        await baseOperations.scrollToBottom(page);
        await baseOperations.clickElementInMenu(page, "Select Menu");
        //STEP1: selecting and validating value from: select value dropdown
        let withGroupValue = "Group 1, option 2";
        await selectMenu.selectWithGroupValue(page, withGroupValue);
        let selectedWithGroupValue = await selectMenu.getWithGroupValue(page);
        expect(withGroupValue).to.eql(selectedWithGroupValue);
        //STEP2: selecting and validating value from: select one dropdown
        let oneValue = "Mrs.";
        await selectMenu.selectOneValue(page, oneValue);
        let selectedOneValue = await selectMenu.getSelectOneValue(page);
        expect(oneValue).to.eql(selectedOneValue);
        //STEP3: selecting and validating value from: Old style select menu dropdown
        let oldStyleValue = "Voilet";
        await selectMenu.selectFromOldStyleMenu(page, oldStyleValue);
        let selectedOldStyleValue = await selectMenu.getOldSelectMenuSelectedValues(page);
        expect(oldStyleValue).to.eql(selectedOldStyleValue);
        //STEP4: selecting and validating value from: Multiselect dropdown
        let multiSelectValue1 = "Green";
        let multiSelectValue2 = "Blue";
        await selectMenu.selectMultiselectDropDown(page, multiSelectValue1);
        await selectMenu.selectMultiselectDropDown(page, multiSelectValue2);
        let selectedMultiSelectValues = await selectMenu.getMultiselectDropDownValues(page);
        let expectedMultiSelect = [multiSelectValue1, multiSelectValue2];
        const isEaqualMultiSelect = expectedMultiSelect.every(option => selectedMultiSelectValues.includes(option));
        expect(isEaqualMultiSelect).true;
        //STEP5: selecting and validating value from: Standard multi select
        baseOperations.scrollToBottom(page);
        let carsSelect = ["volvo", "audi"];
        await selectMenu.selectStandardMultiSelect(page, carsSelect);
        let standardMultiSelectValues = await selectMenu.getStandardMultiSelectValues(page);
        const isEaqualStandardMultiSelect = carsSelect.every(option => standardMultiSelectValues.includes(option));
        expect(isEaqualStandardMultiSelect).true;
    });

    afterEach(async function () {
        await browser.close();
    });
});
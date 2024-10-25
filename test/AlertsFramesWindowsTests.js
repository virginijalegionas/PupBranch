require('dotenv').config();
const puppeteer = require('puppeteer');
var modals = require('../Operations/AlertsFramesWindows/Modals.js');
var frames = require('../Operations/AlertsFramesWindows/Frames.js');
var nestedFrames = require('../Operations/AlertsFramesWindows/NestedFrames.js');
var alerts = require('../Operations/AlertsFramesWindows/Alerts.js');
var baseOperations = require('../BaseOperations.js');
const expect = require('expect.js');
var common = require('../Common.js');


describe('Alerts Frames Windows Tests', function () {
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

    it(`Modal Test`, async function () {
        const expectedSmallModalHeader = "Small Modal";
        const expectedLargeModalHeader = "Large Modal";
        const expectedSmallModalBodyText = "This is a small modal. It has very less content";
        const expectedLargeModalBodyText = "Lorem Ipsum is simply dummy text of the printing and typesetting industry.";

        await baseOperations.clickBlockInHomePage(page, "Alerts, Frame & Windows");
        await baseOperations.clickElementInMenu(page, "Modal Dialogs");
        //STEP1: check small modal        
        await modals.clickSmallModalButton(page);
        let smallModalHeader = await modals.getModalHeaderText(page);
        let smallModalBodyText = await modals.getModalBodyText(page);
        await modals.closeSmallModalByCloseButton(page);
        expect(smallModalHeader).to.equal(`${expectedSmallModalHeader}`);
        expect(smallModalBodyText).to.equal(`${expectedSmallModalBodyText}`);

        //sometimes after closing modal page glitches, need to refresh modal view
        await baseOperations.clickElementInMenu(page, "Nested Frames");
        await baseOperations.clickElementInMenu(page, "Modal Dialogs");

        //STEP2: check large modal
        await modals.clickLargeModalButton(page);
        let largeModalHeader = await modals.getModalHeaderText(page);
        let largeModalBodyText = await modals.getModalBodyText(page);
        await modals.closeLargeModalByCloseButton(page);
        expect(largeModalHeader).to.equal(`${expectedLargeModalHeader}`);
        expect(largeModalBodyText).to.contain(`${expectedLargeModalBodyText}`);
        //close modal by X button
        await baseOperations.clickElementInMenu(page, "Nested Frames");
        await baseOperations.clickElementInMenu(page, "Modal Dialogs");
        await modals.clickLargeModalButton(page);
        await modals.closeModalByX(page);
    });

    it(`Frames Test`, async function () {
        await baseOperations.clickBlockInHomePage(page, "Alerts, Frame & Windows");
        await baseOperations.clickElementInMenu(page, "Frames");
        //get frame1 text
        let expectedFrame1Text = "This is a sample page";
        let actualFrame1Text = await frames.getFrame1Text(page);
        expect(actualFrame1Text).contain(expectedFrame1Text);
        //get frame2 text        
        let expectedFrame2Text = "This is a sample page";
        let actualFrame2Text = await frames.getFrame2Text(page);
        expect(actualFrame2Text).contain(expectedFrame2Text);
    });

    it(`Nested Frames Test`, async function () {
        await baseOperations.clickBlockInHomePage(page, "Alerts, Frame & Windows");
        await baseOperations.clickElementInMenu(page, "Nested Frames");
        //get Parent text
        let expectedParentFrameText = "Parent frame";
        let actualParentFrameText = await nestedFrames.getParentFrameText(page);
        expect(actualParentFrameText).contain(expectedParentFrameText);
        //get Child text
        let expectedChildFrameText = "Child Iframe";
        let actualChildFrameText = await nestedFrames.getChildFrameText(page);
        expect(actualChildFrameText).contain(expectedChildFrameText);
    });

    it(`Alert Test`, async function () {
        await baseOperations.clickBlockInHomePage(page, "Alerts, Frame & Windows");
        await baseOperations.clickElementInMenu(page, "Alerts");
        //test will click all the alert buttons an validate the results
        let expectedAlertMessage = "You clicked a button";
        let expectedAlertIn5SecondsMessage = "This alert appeared after 5 seconds";
        let expectedAlertWithConfirmMessage = "Do you confirm action?";
        let expectedAlertWithPromptMessage = "Please enter your name";
        const alertMessages = [];
        let promptText = `text ${await common.genRandom()}`;
        //listening alerts
        page.on('dialog', async dialog => {
            alertMessages.push(dialog.message());
            await dialog.accept(promptText);
        });
        //clicking alert buttons
        await alerts.clickAlertButton(page);
        await common.wait(1);
        await alerts.clickAlertIn5SecondButton(page);
        await common.wait(6);
        await alerts.clickAlertWithConfirmButton(page);
        await common.wait(1);
        await alerts.clickAlertWithPromptButton(page);
        await common.wait(1);
        //validating alert messages and selections
        expect(alertMessages[0]).contain(expectedAlertMessage);
        expect(alertMessages[1]).contain(expectedAlertIn5SecondsMessage);
        expect(alertMessages[2]).contain(expectedAlertWithConfirmMessage);
        expect(alertMessages[3]).contain(expectedAlertWithPromptMessage);

        let expectedConfirmResult = "You selected Ok";
        let expectedPromptResult = `You entered ${promptText}`;
        let actualConfirmResult = await alerts.getConfirmResult(page);
        let actualPromptResult = await alerts.getPromptResult(page);
        expect(actualConfirmResult).contain(expectedConfirmResult);
        expect(actualPromptResult).contain(expectedPromptResult);
    });

    afterEach(async function () {
        await browser.close();
    });
});
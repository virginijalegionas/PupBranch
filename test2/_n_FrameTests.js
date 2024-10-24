require('dotenv').config();
const puppeteer = require('puppeteer');
var forms = require('../Operations/Frames.js');
var baseOperations = require('../BaseOperations.js');
var common = require('../Common.js');
const expect = require('expect.js');

describe('Frame Tests', function () {
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

	/* it(`Nested Frames Test`, async function () {
		await baseOperations.clickBlockInHomePage(page, "Alerts, Frame & Windows");
		await baseOperations.clickElementInMenu(page, "Nested Frames");

		// const prentFrame = await page.$("iframe[id='frame1']")
		// const prentFrameContent = await prentFrame.contentFrame();
		// let textXpath = `xpath=//body`;
		// let parentFrameText = await prentFrame.$eval(textXpath, element => element.textContent);
		// let expectedparentFrameText = "Parent frame";
		// expect(parentFrameText).contain(expectedparentFrameText);

		let pageFrames = await page.frames();
		let childFrame = await pageFrames.find(element => element.name() == 'Child Iframe');

		console.log('aaaa');
		// const childFrame = await page.$("iframe[id='frame2']")
		// const childFrameContent = await childFrame.contentFrame();
		// let childTextXpath = `xpath=//body/p`;
		// let childFrameText = await childFrameContent.$eval(childTextXpath, element => element.textContent);
		// let expectedchildFrameText = "Child iframe";
		// expect(childFrameText).contain(expectedchildFrameText);

	});

	it(`Frames Test`, async function () {
		await baseOperations.clickBlockInHomePage(page, "Alerts, Frame & Windows");
		await baseOperations.clickElementInMenu(page, "Frames");

		const frame1 = await page.$("iframe[id='frame1']")
		const frameContent1 = await frame1.contentFrame();
		let frame1Text = await frameContent1.$eval('#sampleHeading', element => element.textContent);
		let expectedFrame1Text = "This is a sample page";
		expect(frame1Text).contain(expectedFrame1Text);

		const frame2 = await page.$("iframe[id='frame2']")
		const frameContent2 = await frame2.contentFrame();
		let frame2Text = await frameContent2.$eval('#sampleHeading', element => element.textContent);
		let expectedFrame2Text = "This is a sample page";
		expect(frame2Text).contain(expectedFrame2Text);
	}); */

	afterEach(async function () {
		await browser.close();
	});
});
require('dotenv').config();
const puppeteer = require('puppeteer');
var bookStore = require('../Operations/BookStore/BookStore.js');
var common = require('../Common.js');
var baseOperations = require('../BaseOperations.js');
const expect = require('expect.js');
const fileForData = 'BookResults.csv';
const fs = require('fs');


describe('Book Store Tests', function () {
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

    it(`BookStore MISC`, async function () {
        await baseOperations.clickBlockInHomePage(page, "Elements");
        await baseOperations.hideElementsList(page, "Elements");
        await baseOperations.scrollToBottom(page);
        await baseOperations.clickElementGroup(page, "Book Store Application");
        await baseOperations.clickElementInMenu(page, "Book Store");
        await common.wait(2);
        //STEP1: Navigate between pages, scrap data into file
        await bookStore.selectRowsPerPage(page, '5');
        await bookStore.clickNextButton(page);
        await bookStore.scrapBookDataIntoFile(page);
        let fileContent = fs.readFileSync(fileForData, "utf-8");
        expect(fileContent).not.contain("Addy Osmani");
        expect(fileContent).to.contain("Marijn Haverbeke");
        //go back to previous page
        await bookStore.clickPreviousButton(page);
        await bookStore.scrapBookDataIntoFile(page);
        fileContent = fs.readFileSync(fileForData, "utf-8");
        expect(fileContent).to.contain("Addy Osmani");
        expect(fileContent).not.contain("Marijn Haverbeke");

        //STEP2: Search books        
        await bookStore.searchBooks(page, "press");
        let bookData = await bookStore.getBookData(page);
        expect(bookData.length).equal(2);
        expect(bookData.map(x => x["Author"])).to.contain("Marijn Haverbeke");
        expect(bookData.map(x => x["Author"])).to.contain("Nicholas C. Zakas");
    });

    afterEach(async function () {
        await browser.close();
    });
});
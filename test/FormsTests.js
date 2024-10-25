require('dotenv').config();
const puppeteer = require('puppeteer');
var forms = require('../Operations/Forms/PracticeForm.js');
var baseOperations = require('../BaseOperations.js');
var common = require('../Common.js');
const expect = require('expect.js');

describe('Forms Tests', function () {
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

    it(`Practice Form Test`, async function () {
        await baseOperations.clickBlockInHomePage(page, "Forms");
        await baseOperations.clickElementInMenu(page, "Practice Form");
        let firstName = `fName ${await common.genRandom()}`;
        let lastName = `LName ${await common.genRandom()}`;
        let email = `mail${await common.genRandom()}@mail.com`;
        let gender = "Male";
        let mobile = `6666666666`;
        let subject1 = "Maths";
        let subject2 = "Arts";
        let hobby1 = "Sports";
        let hobby2 = "Music";
        let currAddress = `current address ${await common.genRandom()}`;
        let state = "Uttar Pradesh";
        let city = "Merrut";

        await forms.inputFirstName(page, firstName);
        await forms.inputLastName(page, lastName);
        await forms.inputEmail(page, email);
        await forms.selectGender(page, gender);
        await forms.inputMobile(page, mobile);
        const birthDate = new Date("2020-08-12");
        await forms.selectDateOfBirth(page, birthDate);
        await forms.selectSubjects(page, subject1);
        await forms.selectSubjects(page, subject2);
        await forms.selectHobbies(page, hobby1);
        await forms.selectHobbies(page, hobby2);
        let fileName = "sample1.jpeg";
        await forms.choosePicture(page, fileName);
        await forms.inputCurrentAddress(page, currAddress);
        await forms.selectState(page, state);
        await forms.selectCity(page, city);
        await forms.clickSubmit(page);
        var results = await forms.getFormData(page);
        await forms.closeResultsForm(page);

        expect(results["Student Name"]).contain(`${firstName} ${lastName}`);
        expect(results["Student Email"]).contain(email);
        expect(results["Gender"]).contain(gender);
        expect(results["Mobile"]).contain(mobile);
        let expectedDateValue = await forms.formatDateForResultsValidation(birthDate);
        expect(results["Date of Birth"]).contain(expectedDateValue);
        expect(results["Subjects"]).contain(`${subject1}, ${subject2}`);
        expect(results["Hobbies"]).contain(`${hobby1}, ${hobby2}`);
        expect(results["Picture"]).contain(fileName);
        expect(results["Address"]).contain(currAddress);
        expect(results["State and City"]).contain(`${state} ${city}`);
    });

    afterEach(async function () {
        await browser.close();
    });
});
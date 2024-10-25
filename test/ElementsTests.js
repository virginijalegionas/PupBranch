require('dotenv').config();
const puppeteer = require('puppeteer');
var wtables = require('../Operations/Elements/WebTables.js');
var checkBox = require('../Operations/Elements/CheckBox.js');
var textBox = require('../Operations/Elements/TextBox.js');
var radio = require('../Operations/Elements/RadioButton.js');
var buttons = require('../Operations/Elements/Buttons.js');
var upDown = require('../Operations/Elements/UploadDownload.js');
var common = require('../Common.js');
var baseOperations = require('../BaseOperations.js');
const expect = require('expect.js');

describe('Elements Tests', function () {
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

    it(`Text Box Test`, async function () {
        await baseOperations.clickBlockInHomePage(page, "Elements");
        await baseOperations.clickElementInMenu(page, "Text Box");
        //STEP1: input values validate results
        let fullName = `testName ${await common.genRandom()}`;
        let email = `mail${await common.genRandom()}@mail.com`;
        let currAddress = `current address`;
        let permAddress = `permanent address`;
        await textBox.inputFullName(page, fullName);
        await textBox.inputEmail(page, email);
        await textBox.inputCurrentAddress(page, currAddress);
        await textBox.inputPermanentAddress(page, permAddress);
        await textBox.clickSubmit(page);
        var results = await textBox.getTextBoxResults(page);
        expect(results[0]).to.equal(`${fullName}`);
        expect(results[1]).to.equal(`${email}`);
        expect(results[2]).to.equal(`${currAddress}`);
        expect(results[3]).to.equal(`${permAddress}`);

        //STEP2: update values validate results
        let fullNameUpdate = `updName ${await common.genRandom()}`;
        let emailUpdate = `updMail${await common.genRandom()}@mail.com`;
        let currAddressUpdate = `Updated current address`;
        let permAddressUpdate = `Updated permanent address`;
        await textBox.inputFullName(page, fullNameUpdate);
        await textBox.inputEmail(page, emailUpdate);
        await textBox.inputCurrentAddress(page, currAddressUpdate);
        await textBox.inputPermanentAddress(page, permAddressUpdate);
        await textBox.clickSubmit(page);
        results = await textBox.getTextBoxResults(page);
        expect(results[0]).to.equal(`${fullNameUpdate}`);
        expect(results[1]).to.equal(`${emailUpdate}`);
        expect(results[2]).to.equal(`${currAddressUpdate}`);
        expect(results[3]).to.equal(`${permAddressUpdate}`);

        //STEP3: validate email field
        //validation that email field border is changed when non supported email entered
        let nonSupportedEmail = `mail${await common.genRandom()}`;
        await textBox.inputEmail(page, nonSupportedEmail);
        await textBox.clickSubmit(page);
        let classAttributeValue = await textBox.getEmailClassAttributeValue(page);
        let expectedClassAttributeValue = 'mr-sm-2 field-error form-control';
        expect(classAttributeValue).to.equal(`${expectedClassAttributeValue}`);

        //validation, that email border becomes common when supported email entered
        let supportedEmail = `mail${await common.genRandom()}@gmail.com`;
        await textBox.inputEmail(page, supportedEmail);
        await textBox.clickSubmit(page);
        classAttributeValue = await textBox.getEmailClassAttributeValue(page);
        expect(classAttributeValue).to.not.equal(`${expectedClassAttributeValue}`);

        var results = await textBox.getTextBoxResults(page);
        expect(results[1]).to.equal(`${supportedEmail}`);
    });

    it(`Check Box Test`, async function () {
        await baseOperations.clickBlockInHomePage(page, "Elements");
        await baseOperations.clickElementInMenu(page, "Check Box");
        //exploratory test, buy checking and unchecking parent and child nodes
        await checkBox.expandHomeTreeList(page);
        await checkBox.expandChildList(page, "Documents");
        await checkBox.expandChildList(page, "WorkSpace");
        await checkBox.checkNodeCheckBox(page, "Angular");

        expect(await checkBox.isNodeChecked(page, "Home")).to.equal("halfChecked");
        expect(await checkBox.isNodeChecked(page, "Documents")).to.equal("halfChecked");
        expect(await checkBox.isNodeChecked(page, "WorkSpace")).to.equal("halfChecked");
        expect(await checkBox.isNodeChecked(page, "Angular")).to.equal("checked");
        expect(await checkBox.isNodeChecked(page, "React")).to.equal("unChecked");
        //Check Parent
        await checkBox.checkNodeCheckBox(page, "WorkSpace")
        expect(await checkBox.isNodeChecked(page, "Home")).to.equal("halfChecked");
        expect(await checkBox.isNodeChecked(page, "Documents")).to.equal("halfChecked");
        expect(await checkBox.isNodeChecked(page, "WorkSpace")).to.equal("checked");
        expect(await checkBox.isNodeChecked(page, "React")).to.equal("checked");
        expect(await checkBox.isNodeChecked(page, "Angular")).to.equal("checked");
        expect(await checkBox.isNodeChecked(page, "Veu")).to.equal("checked");
        //uncheck Child
        await checkBox.unCheckNodeCheckBox(page, "Veu")
        expect(await checkBox.isNodeChecked(page, "Home")).to.equal("halfChecked");
        expect(await checkBox.isNodeChecked(page, "Documents")).to.equal("halfChecked");
        expect(await checkBox.isNodeChecked(page, "WorkSpace")).to.equal("halfChecked");
        expect(await checkBox.isNodeChecked(page, "React")).to.equal("checked");
        expect(await checkBox.isNodeChecked(page, "Angular")).to.equal("checked");
        expect(await checkBox.isNodeChecked(page, "Veu")).to.equal("unChecked");
        //uncheck Parent
        await checkBox.unCheckNodeCheckBox(page, "WorkSpace")
        expect(await checkBox.isNodeChecked(page, "Home")).to.equal("unChecked");
        expect(await checkBox.isNodeChecked(page, "Documents")).to.equal("unChecked");
        expect(await checkBox.isNodeChecked(page, "WorkSpace")).to.equal("unChecked");
        expect(await checkBox.isNodeChecked(page, "React")).to.equal("unChecked");
        expect(await checkBox.isNodeChecked(page, "Angular")).to.equal("unChecked");
        expect(await checkBox.isNodeChecked(page, "Veu")).to.equal("unChecked");
    });

    it(`Radio Test`, async function () {
        await baseOperations.clickBlockInHomePage(page, "Elements");
        await baseOperations.clickElementInMenu(page, "Radio Button");
        //Select Radio, validate selection message correct
        await radio.selectRadio(page, "Yes");
        expect(await radio.getSelectedRadioValue(page)).to.equal("Yes");
        await radio.selectRadio(page, "Impressive");
        expect(await radio.getSelectedRadioValue(page)).to.equal("Impressive");

        //Validate which radio is selectable (not read only/disabled)
        expect(await radio.isRadioSelectable(page, "Yes")).to.equal(true);
        expect(await radio.isRadioSelectable(page, "Impressive")).to.equal(true);
        expect(await radio.isRadioSelectable(page, "No")).to.equal(false);
    });

    it(`Web Tables Test`, async function () {
        await baseOperations.clickBlockInHomePage(page, "Elements");
        await baseOperations.clickElementInMenu(page, "Web Tables");

        //STEP1: Add New Record
        let fName = `fName ${await common.genRandom()}`;
        let lName = `lName ${await common.genRandom()}`;
        let email = `emmail@mail.com`;
        let age = '20';
        let salary = '2000';
        let department = `dep ${await common.genRandom()}`;
        await wtables.addNewRecord(page, fName, lName, age, email, salary, department);
        var tableResults = await wtables.getTableData(page);
        var foundRow = tableResults.find(x => x["First Name"] == fName);
        expect(tableResults.length).equal(4);
        expect(foundRow["First Name"]).equal(fName);
        expect(foundRow["Last Name"]).equal(lName);
        expect(foundRow["Email"]).equal(email);
        expect(foundRow["Age"]).equal(age);
        expect(foundRow["Salary"]).equal(salary);
        expect(foundRow["Department"]).equal(department);

        //STEP2: Edit Record
        let updateFName = `fName ${await common.genRandom()}`;
        let updateLName = `lName ${await common.genRandom()}`;
        let updateEmail = `onemail@mail.com`;
        let updateAge = '41';
        let updateSalary = '2150';
        let updateDepartment = `dep ${await common.genRandom()}`;
        await wtables.editRecordByFirstName(page, "Cierra", updateFName, updateLName, updateAge, updateEmail, updateSalary, updateDepartment);
        var tableResults = await wtables.getTableData(page);
        var foundRow = tableResults.find(x => x["First Name"] == fName);
        expect(tableResults.length).equal(4);
        expect(foundRow["First Name"]).equal(fName);
        expect(foundRow["Last Name"]).equal(lName);
        expect(foundRow["Email"]).equal(email);
        expect(foundRow["Age"]).equal(age);
        expect(foundRow["Salary"]).equal(salary);
        expect(foundRow["Department"]).equal(department);
        expect(tableResults.map(x => x["First Name"])).not.contain("Cierra");

        //STEP3: delete record
        await wtables.clickDeleteInTableByFirstName(page, "Kierra");
        var tableResults = await wtables.getTableData(page);
        expect(tableResults.length).equal(3);
        expect(tableResults.map(x => x["First Name"])).not.contain("Kierra");

        //STEP4: Search Record
        await wtables.searchInTheTable(page, "Alden");
        var tableResults = await wtables.getTableData(page);
        var getRow = tableResults.find(x => x["First Name"] == "Alden");
        expect(getRow["First Name"]).equal("Alden");
        expect(getRow["Last Name"]).equal("Cantrell");
        expect(getRow["Email"]).equal("alden@example.com");
        expect(getRow["Age"]).equal("45");
        expect(getRow["Salary"]).equal("12000");
        expect(getRow["Department"]).equal("Compliance");
        //checking it is possible to search with different values from different columns  
        await wtables.searchInTheTable(page, email);
        var tableResults2 = await wtables.getTableData(page);
        var getRow2 = tableResults2.find(x => x["Email"] == email);
        expect(getRow2["First Name"]).equal(fName);
        expect(getRow2["Last Name"]).equal(lName);
        expect(getRow2["Email"]).equal(email);
        expect(getRow2["Age"]).equal(age);
        expect(getRow2["Salary"]).equal(salary);
        expect(getRow2["Department"]).equal(department);
    });

    it(`Buttons Test`, async function () {
        let rightClickExpectedResponseMessage = 'You have done a right click';
        let doubleClickExpectedResponseMessage = 'You have done a double click';
        let dynamicClickExpectedResponseMessage = 'You have done a dynamic click';

        await baseOperations.clickBlockInHomePage(page, "Elements");
        await baseOperations.clickElementInMenu(page, "Buttons");
        await buttons.clickRightButton(page);
        await buttons.clickDoubleButton(page);
        await buttons.clickMeButton(page);

        let rightClickResponseMessage = await buttons.getRightClickMessage(page);
        let doubleClickResponseMessage = await buttons.getDoubleClickMessage(page);
        let dynamicClickResponseMessage = await buttons.getClickMeMessage(page);
        expect(rightClickResponseMessage).to.equal(`${rightClickExpectedResponseMessage}`);
        expect(doubleClickResponseMessage).to.eql(`${doubleClickExpectedResponseMessage}`);
        expect(dynamicClickResponseMessage).to.equal(`${dynamicClickExpectedResponseMessage}`);
    });

    it(`Upload Download File Test`, async function () {
        await baseOperations.clickBlockInHomePage(page, "Elements");
        await baseOperations.clickElementInMenu(page, "Upload and Download");
        //STEP1: Upload file
        await upDown.uploadFile(page, uploadFileName);
        const expectedPath = `C:\\fakepath\\${uploadFileName}`;
        let uploadedFilePath = await upDown.getUploadedFilePath(page);
        expect(uploadedFilePath).to.equal(`${expectedPath}`);

        const fs = require('fs');
        let fileExists = fs.existsSync(`${downloadDirectory}${downloadFileName}`);
        //clear file in case it already exists in the folder
        if (fileExists == true) {
            fs.unlinkSync(`${downloadDirectory}${downloadFileName}`);
        }
        //STEP2: download file
        await upDown.clickDowloadButton(page);
        await common.wait(2);
        fileExists = fs.existsSync(`${downloadDirectory}${downloadFileName}`);
        expect(fileExists).to.equal(true);
        fs.unlinkSync(`${downloadDirectory}${downloadFileName}`);
    });

    afterEach(async function () {
        await browser.close();
    });
});
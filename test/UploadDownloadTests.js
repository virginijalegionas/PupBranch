require('dotenv').config();
const puppeteer = require('puppeteer');
var upDown = require('../Elements/UploadDownload.js');
var common = require('../Common.js');
const expect = require('expect.js');
const uploadFileName = "sample1.jpg";
const downloadFileName = "sampleFile.jpeg";
const downloadDirectory = "C:\\Users\\virginija\\Downloads\\";

describe('Upload Download Tests', function () {
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

  it(`Upload File Test`, async function () {
    await common.clickBlockInHomePage(page, "Elements");
    await common.clickElementInMenu(page, "Upload and Download");
    await upDown.uploadFile(page, uploadFileName);
    const expectedPath = `C:\\fakepath\\${uploadFileName}`;
    let uploadedFilePath = await upDown.getUploadedFilePath(page);
    expect(uploadedFilePath).to.equal(`${expectedPath}`);
  });

  it(`Download File Test`, async function () {
    await common.clickBlockInHomePage(page, "Elements");
    await common.clickElementInMenu(page, "Upload and Download");

    const fs = require('fs');
    let fileExists = fs.existsSync(`${downloadDirectory}${downloadFileName}`);
    //clear file in case it already exists in the folder
    if (fileExists == true) {
      fs.unlinkSync(`${downloadDirectory}${downloadFileName}`);
    }
    //download file
    await upDown.clickDowloadButton(page);
    await common.wait(1);
    fileExists = fs.existsSync(`${downloadDirectory}${downloadFileName}`);
    expect(fileExists).to.equal(true);
    fs.unlinkSync(`${downloadDirectory}${downloadFileName}`);
  });


  afterEach(async function () {
    await browser.close();
  });

});
//import { expect } from 'chai';
let pageUrl =  "https://demoqa.com/";
//import {puppeteer} from 'puppeteer';
const puppeteer =  require('puppeteer');
var buttons = require('../Elements/Buttons');
var common = require('../Common');
const expect = require('../node_modules/expect.js');


describe('simple test', function(){
  let page;
  let browser;
   this.timeout(100000); 

    beforeEach (async function () {
        browser = await puppeteer.launch(
            {
              headless: false,
              defaultViewport: false,
              args: ['--start-maximized']
            }
          );
          page = await browser.newPage();
          await page.goto(pageUrl);
    });
  
   
    let expectedResponseMessage = 'You have done a right click';
    it(`Check Expected Response Message: ${expectedResponseMessage}`, async function () {
        
        await common.clickBlockInHomePage(page, "Elements");
        await common.clickElementInMenu(page, "Buttons");
        await buttons.clickRightButton(page);

        let responseMessage =  await buttons.getRightClickMessage(page);
        expect(responseMessage).to.equal(`${expectedResponseMessage}`);
      });
      afterEach (async function () {
        await browser.close();   
      });
    
});
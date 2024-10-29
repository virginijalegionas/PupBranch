exports.OpenTab = async function (page, tab) {
    let tabXpath = `xpath=//nav/a[contains(text(), '${tab}')]`;
    let ariaSelected = await page.$eval(tabXpath, el => el.getAttribute("aria-selected"))
    if (ariaSelected == 'false') {
        await page.locator(tabXpath).click();
    }
    else {
        console.log(`tab: ${tab} is already opened`);
    }
}

exports.getTabText = async function (page, tab) {
    let tabLowerCase = tab.toLowerCase();
    let elementXpath = `xpath=//div[@id='demo-tabpane-${tabLowerCase}']`;
    const textElement = await page.$(elementXpath);
    let allParagraphsInTextElement = await textElement.$$eval('p', nodes => nodes.map(n => n.innerText));
    //combine all paragraphs into one string
    let text = "";
    if (allParagraphsInTextElement.length > 1) {
        for (let element in allParagraphsInTextElement) {
            text = text + allParagraphsInTextElement.at(element);
        }
        return text;
    }
    else {
        return allParagraphsInTextElement[0];
    }
}
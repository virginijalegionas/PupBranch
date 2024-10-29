exports.expandAccordian = async function (page, value) {
    let elementXpath = `xpath=//div[contains(text(), '${value}')]//following-sibling::div`;
    let classValue = await page.$eval(elementXpath, el => el.getAttribute("class"))
    if (classValue == "collapse") {
        let elemClickxpath = `xpath=//div[contains(text(), '${value}')]`;
        await page.locator(elemClickxpath).click();
    }
    else {
        console.log(`Accordian: "${value}" is already expanded`);
    }
}

exports.collapseAccordian = async function (page, value) {
    let elementXpath = `xpath=//div[contains(text(), '${value}')]//following-sibling::div`;
    let classValue = await page.$eval(elementXpath, el => el.getAttribute("class"))
    if (classValue == "collapse show") {
        let elemClickxpath = `xpath=//div[contains(text(), '${value}')]`;
        await page.locator(elemClickxpath).click();
    }
    else {
        console.log(`Accordian: "${value}" is already expanded`);
    }
}

exports.getAccordianText = async function (page, accordianValue) {
    let elementXpath = `xpath=//div[contains(text(), '${accordianValue}')]//following-sibling::div//div[@class='card-body']`;
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
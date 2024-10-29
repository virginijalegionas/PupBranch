const fs = require('fs');
const fileForData = 'BookResults.csv';

exports.clickNextButton = async function (page) {
    let xpath = `xpath=//button[contains(text(), 'Next')]`;
    await page.locator(xpath).click();
}

exports.clickPreviousButton = async function (page) {
    let xpath = `xpath=//button[contains(text(), 'Previous')]`;
    await page.locator(xpath).click();
}

exports.searchBooks = async function (page, searchString) {
    let xpath = `xpath=//input[@id='searchBox']`;
    await page.locator(xpath).fill(searchString);
    await page.locator('.input-group-append').click();
}

exports.selectRowsPerPage = async function (page, rowsInPage) {
    let xpath = `xpath=//select[@aria-label='rows per page']`;
    const rows = await page.$(xpath);
    await rows.select(rowsInPage);
}

exports.getBookData = async function (page) {
    var bookHeader = new Array();
    var bookData = new Array();
    const headerHandle = await page.$(`.rt-tr`);
    bookHeader = await headerHandle.$$eval('.rt-resizable-header-content', nodes => nodes.map(n => n.innerText));
    let hl = bookHeader.length;
    var rowHandle = new Array();
    rowHandle = await page.$$('div.rt-tr-group');
    for (let column in rowHandle) {
        var rowResults = await rowHandle[column].$$eval('div.rt-td', nodes => nodes.map(n => n.innerText));
        var rowData = new Object();
        //empty lines have some weird character in its fields
        if (rowResults[0].charCodeAt(0) != 160) {
            for (b = 0; b < hl; b++) {
                rowData[bookHeader[b]] = rowResults[b];
            }
            bookData.push(rowData);
        }
    }
    return bookData;
}

exports.scrapBookDataIntoFile = async function (page) {
    let fileExists = fs.existsSync(fileForData);
    //delete file before start
    if (fileExists == true) {
        fs.unlinkSync(fileForData);
    }
    let bookDada = await exports.getBookData(page);
    let fileContent = 'Image,Title,Author,Publisher\n'; //adding header   
    for (let book of bookDada) {
        fileContent = fileContent + `${book.Image},${book.Title},${book.Author},${book.Publisher}\n`; //adding row content

    }
    fs.writeFileSync(fileForData, fileContent);
}

exports.getFrame1Text = async function (page) {
    const frame1 = await page.$("iframe[id='frame1']")
    const frameContent1 = await frame1.contentFrame();
    let frame1Text = await frameContent1.$eval('#sampleHeading', element => element.textContent);
    return frame1Text;
}

exports.getFrame2Text = async function (page) {
    const frame2 = await page.$("iframe[id='frame2']")
    const frameContent2 = await frame2.contentFrame();
    let frame2Text = await frameContent2.$eval('#sampleHeading', element => element.textContent);
    return frame2Text;
}

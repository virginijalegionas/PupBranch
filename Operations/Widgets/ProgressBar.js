exports.clickStartStop = async function (page) {
    await page.locator('#startStopButton').click();
}

exports.getProgressValue = async function (page) {
    let progressValue = await page.$eval('.progress-bar', el => el.getAttribute("aria-valuenow"));
    return progressValue;
}
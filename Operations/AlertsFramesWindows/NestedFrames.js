exports.getParentFrameText = async function (page) {
    const parentFrame = await page.$("iframe[id='frame1']");
    const parentFrameContent = await parentFrame.contentFrame();
    let parentframeText = await parentFrameContent.$eval(`xpath=//body`, element => element.textContent);
    return parentframeText;
}

exports.getChildFrameText = async function (page) {
    const parentFrame = await page.$("iframe[id='frame1']");
    const parentFrameContent = await parentFrame.contentFrame();
    const childFrame = await parentFrameContent.$('iframe');
    const childFrameContent = await childFrame.contentFrame();
    let childframeText = await childFrameContent.$eval(`xpath=//body/p`, element => element.textContent);
    return childframeText;
}

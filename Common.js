exports.wait = async function (seconds) {
    var waitSeconds = seconds * 1000;
    await new Promise(r => setTimeout(r, waitSeconds));
}

exports.genRandom = async function () {
    let r = (Math.random() + 1).toString(36).substring(7);
    return r;
}

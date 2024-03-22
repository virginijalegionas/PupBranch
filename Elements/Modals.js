var common = require('./../Common');

exports.clickSmallModalButton = async function (page ){    
    common.clickButton(page, '#showSmallModal');
  }

  exports.clickLargeModalButton = async function (page ){    
    common.clickButton(page, '#showLargeModal');
  }
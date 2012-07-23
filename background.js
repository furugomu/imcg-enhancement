// 設定とか
var defaults = {
  "user-agent": "Mozilla/5.0 (Linux; U; Android 2.3.6; en-us; Nexus S Build/GRK39F) AppleWebKit/533.1 (KHTML, like Gecko) Version/4.0 Mobile Safari/533.1",
  "nise-addressbar": false,
  "present-uncheck": true,
  "cheer-autofocus": true,
  "batch-trade": false,
  "zoom-image": true,
};

function getOption(name) {
  var json = localStorage.getItem(name);
  if (json == null) // null or undefined
    return defaults[name];
  else
    return JSON.parse(json);
}

// User-Agent を変える
chrome.webRequest.onBeforeSendHeaders.addListener(
  function(details) {
    for (var i = 0; i < details.requestHeaders.length; ++i) {
      var h = details.requestHeaders[i];
      if (h.name === 'User-Agent') {
        h.value = getOption("user-agent");
      }
    }
    return {requestHeaders: details.requestHeaders};
  },
  // filters
  {urls: ["*://*.mbga.jp/*"]},
  // extraInfoSpec
  ["requestHeaders", "blocking"]);

// content script 等に設定を渡すやつ
chrome.extension.onRequest.addListener(
  function(request, sender, sendResponse) {
    if (request.option) {
      sendResponse(getOption(request.option));
    }
    else if (request.options) {
      var options = {};
      for (var i = 0; i < request.options; ++i) {
        var key = request.options[i];
        options[key] = getOption(key);
      }
      sendResponse(options);
    }
    else {
      sendResponse({}); // snub them.
    }
  }
);

// ページアクションのアイコンを表示
chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
  if (tab.url.indexOf('http://sp.pf.mbga.jp/12008305/') != 0) return;
  chrome.pageAction.show(tabId);
});

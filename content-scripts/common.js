function E(name) {
  var element = document.createElement(name);
  for (var i = 1, len = arguments.length; i < len; ++i) {
    var arg = arguments[i];
    if (arg.nodeType) { // Element
      element.appendChild(arg);
    }
    else if (arg.substring) { // ""
      element.appendChild(document.createTextNode(arg));
    }
    else if (arg.call) { // function
      arg.call(element);
    }
    else { // {}
      for (var name in arg) {
        var value = arg[name];
        if (name == 'className') name = 'class';
        element.setAttribute(name, value);
      }
    }
  }
  return element;
}

// callback: function(value)
function getOption(name, callback) {
  chrome.extension.sendRequest({option: name}, callback);
}

function originalUrl(url) {
  if (!url) url = location.href;
  var q = url.substring(url.indexOf('?')+1);
  var map = {};
  var segments = q.split("&");
  for (var i = 0; i < segments.length; ++i) {
    var pair = segments[i].split("=");
    if (pair[0] != "url") continue;
    return decodeURIComponent(pair[1]);
  }
  return url;
}

function mbgaUrl(url) {
  return 'http://sp.pf.mbga.jp/12008305/?url=' +
    encodeURIComponent(url);
}

function imcgUrl(path) {
  return mbgaUrl('http://125.6.169.35/idolmaster/'+path);
}

// 敵中でスクリプトを実行
function executeScript(f) {
  document.body.appendChild(E('script', '('+f.toString()+')()'));
}

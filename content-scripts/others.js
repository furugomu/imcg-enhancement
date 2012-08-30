// そのた

// プレゼントのチェックを外す
getOption('present-uncheck', function(enabled) {
  if (!enabled) return;
  executeScript(function() {
    jQuery("#chks_change").click();
  });
});

// 応援オートフォーカス
getOption('cheer-autofocus', function(enabled) {
  if (!enabled) return;
  if (originalUrl(location.href).indexOf('comment_check') >= 0) {
    document.querySelector('[type=submit]').focus();
  }
  else {
    var element = document.getElementsByName("message")[0];
    if (element) {
      element.focus();
      element.select();
    }
  }
});

// アルバムからトレード成立履歴へ
(function() {
  var m = originalUrl().match(/\/archive\/view\/([0-9]+)/);
  if (!m) return;
  var button = function(title, href) {
    return '<a href="'+href+'" class="grayButton300">'+title+'</a>';
  }
  var links =
    '<a href="'+imcgUrl('auction/search_top/0/'+m[1])+'">'+
    'フリートレードで検索</a><br>'+
    '<a href="'+imcgUrl('auction/history/'+m[1])+'">'+
    'トレード成立履歴</a>';
  links =
    button('フリートレードで検索', imcgUrl('auction/search_top/0/'+m[1]))+
    button('トレード成立履歴', imcgUrl('auction/history/'+m[1]));
  console.log(links);
  // 下方にあるボタンの次に置く
  document.querySelector('a.grayButton300')
      .insertAdjacentHTML('afterend', links);

})();

// フリートレードのマニーにカンマを付ける
(function() {
  if (location.href.indexOf('%2Fauction%2Fsearch_top') < 0) return;

  var insertComma = function(root) {
    if (!root) root = document;
    var result = document.evaluate(
      ".//text()",
      root,
      null,
      XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
      null);
    for (var i = result.snapshotLength - 1; i > 0; --i) {
      var node = result.snapshotItem(i);
      var text = node.nodeValue;
      while (text.match(/\d{4}/)) {
        text = text.replace(/(\d+)(\d{3})/, "$1,$2");
      }
      node.nodeValue = text;
    }
  }
  insertComma(document);
  var handler = function(e) { insertComma(e.target) }
  window.addEventListener('AutoPagerize_DOMNodeInserted', handler, false);
  window.addEventListener('AutoPatchWork.DOMNodeInserted', handler, false);
  window.addEventListener('AutoPagerAfterInsert', handler, false);

})();

// フリートレードの希望内容をID直接指定
(function() {
  if (location.href.indexOf('%2Fauction%2Fexhibit_select%3F') < 0) return;
  // 「～から追加」の次に入力欄を作る
  var result = document.evaluate(
    '//text()[contains(self::text(), "から追加")]/following::*',
    document,
    null,
    XPathResult.FIRST_ORDERED_NODE_TYPE,
    null);
  var node = result.singleNodeValue;
  var form =
    E('form',
      E('div',
        E('input', {name: 'id', placeholder: 'Idol ID'}),
        E('button', 'add')));
  form.addEventListener('submit', function(e) {
    var id = e.target.elements['id'].value;
    location.href = imcgUrl('auction/exhibit_add_check?type=1&id='+id);
    e.preventDefault();
  }, false);
  node.insertAdjacentElement('afterend', form);
  //imcgUrl('auction/exhibit_add_check?type=1&id='+idolId);
})();

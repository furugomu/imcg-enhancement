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
})();

// フリートレードでボタンにフォーカス
(function() {
  if (location.href.indexOf('%2Fauction%2Fsearch_contract') >= 0 &&
      location.href.indexOf('search_contract_complete') < 0)
  {
    document.querySelector('[type=submit]').focus();
  }
})();

(function() {
  if (location.href.indexOf('%2Fauction%2Fsearch_top') < 0) return;
  var links = document.querySelectorAll('a[href*="%2Fsearch_top%2F0%2F"]');
  for (var i = 0; i < links.length; ++i) {
    var m = links[i].href.match(/%2Fsearch_top%2F0%2F([0-9]{7})/);
    if (!m) break;
    var html = '<a class="a_link" href="'+
      imcgUrl('auction/history/'+m[1])+'">'+
      '成立履歴</a>';
    var a = E('a', '成立履歴', {
      href: imcgUrl('auction/history/'+m[1]),
      className: 'a_link',
    })
    links[i].insertAdjacentElement('afterend', a);
  }
})();

// プロフィールページのURLを一意にしたい
(function() {
  if (location.href.indexOf('%2Fprofile%2Fshow%2F') < 0) return;
  // %3Frnd%3D999168078$
  var url = location.href.replace(/%3Frnd%3D\d+$/, '');
  history.replaceState(null, null, url);
})();

// 親愛度MAXをもう一度
(function() {
  var m = location.href.match(/%2Fcard_list%2Fdesc%2F(\d+)/);
  if (!m) return;
  var buttons = document.querySelectorAll('.grayButton300');
  if (buttons.length == 0) return;
  var url = imcgUrl('love/flash/'+m[1]);
  var button = E('a', {'class': 'grayButton300', href: url},
                 '親愛度MAXメッセージをもう一度見る');
  buttons[buttons.length - 1].insertAdjacentElement('afterend', button);
})();

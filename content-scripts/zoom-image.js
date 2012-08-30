// アイドルの画像をクリックした時でかいのを表示する
getOption("zoom-image", function(enabled) {
  if (!enabled) return;

  var enlarge = function(event) {
    // なんとかボックスみたいなのを作る
    var idolId = event.currentTarget.dataset.idolId;
    var div =
      E('div',
        E('img', {src: event.currentTarget.dataset.large, alt: ''}),
        E('br'),
        E('a', 'ホシイモノに追加', {href: imcgUrl('wish/regist/'+idolId+'/0')}));
    var s = div.style;
    s.top = '0';
    s.left = '0';
    s.width = '100%';
    s.height = '100%';
    s.position = 'fixed';
    s.textAlign = 'center';
    s.backgroundColor = 'rgba(0, 0, 0, 0.5)';
    // まんなかに表示
    var paddingTop = (window.innerHeight - 800) / 2;
    if (paddingTop > 0) s.paddingTop = paddingTop + 'px';
    // なんとかボックスをクリックしたら閉じる
    div.addEventListener('click', function(e) {
      e.currentTarget.parentNode.removeChild(e.currentTarget);
    }, false);
    document.body.appendChild(div);
  }

  // アイドルの画像にイベントハンドラーをくっつける
  var re = /(%2Fcard%2F)(\w+%2F)([0-9a-f]+)/;
  for (var i = 0, len = document.images.length; i < len; ++i) {
    var image = document.images[i];
    if (!image.src) continue;
    var m = image.src.match(re);
    if (!m) continue;
    image.dataset.large = originalUrl(image.src.replace(re, m[1]+'l%2F'+m[3]));
    image.dataset.idolId = m[3];
    image.addEventListener('click', enlarge, false);
  }
  // label とリンクの下にある画像は対象外
  var remove = function(selector) {
    var elements = document.querySelectorAll(selector);
    for (var i = 0, len = elements.length; i < len; ++i) {
      elements[i].removeEventListener('click', enlarge, false);
    }
  }
  remove('label img');
  remove('a[href] img');
});

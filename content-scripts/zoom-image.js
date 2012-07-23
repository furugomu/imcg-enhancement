getOption("zoom-image", function(enabled) {
  if (!enabled) return;
  // チェックボックスがたくさんあるページではやらない
  if (document.querySelectorAll('[type=checkbox]').length >= 4) return;

  var enlarge = function(event) {
    // なんとかボックスみたいなのを作る
    var div =
      E('div',
        E('img', {src: event.currentTarget.dataset.large, alt: ''}));
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
  var re = /(%2Fcard%2F)(\w+)/;
  for (var i = 0, len = document.images.length; i < len; ++i) {
    var image = document.images[i];
    if (!image.src) continue;
    var m = image.src.match(re);
    if (!m) continue;
    image.dataset.large = image.src.replace(re, m[1]+'l');
    image.addEventListener('click', enlarge, false);
  }
});

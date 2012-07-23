// 偽アドレスバー
getOption("nise-addressbar", function(show) {
  //console.log('nise-addressbar', show);
  if (!show) return;
  var bar =
    E('div', {id: 'nise-addressbar'},
      E('form', function() {
        this.addEventListener('submit', function(e) {
          console.log('ハイヨー！');
          e.preventDefault();
          location.href = mbgaUrl(this.elements['url'].value);
        }, false);
      },
        E('div',
          E('input', {name: 'url', value: originalUrl()}))));
  document.body.insertBefore(bar, document.body.firstChild);
  document.body.className += ' has-nise-addressbar';
});

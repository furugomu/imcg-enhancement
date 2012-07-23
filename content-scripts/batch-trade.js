getOption('batch-trade', function(enabled) {
  if (!enabled) return;

  var localStorageGetItem = function(key, defaultValue) {
    var json = localStorage.getItem(key);
    var value = json ? JSON.parse(json) : null;
    if (value == null) value = defaultValue;
    return value;
  }
  var localStorageSetItem = function(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
  }
  var load = function() {
    return localStorageGetItem('trade-ids', null);
  }
  var save = function(value) {
    return localStorageSetItem('trade-ids', value);
  }
  // 作業中？
  var trading = function() {
    var ids = load();
    return ids && ids.length > 0;
  }

  var eachIdolArea = function(callback) {
    var elements = document.querySelectorAll(
      '.title_hanyo, img[src$="line_hanyo_ten.jpg"]');
    var range = document.createRange();
    for (var i = 1; i < elements.length; ++i) {
      range.setStartAfter(elements[i-1]);
      range.setEndBefore(elements[i]);
      // documentFragment を使ったほうが良さそう
      var div = document.createElement('div');
      range.surroundContents(div);
      if (div.firstElementChild.nodeName == "BR")
        div.removeChild(div.firstElementChild);
      callback(div);
    }
  }

  var selectNextIdol = function() {
    // アイドルのID
    var ids = load();
    var s_id = ids.shift();
    save(ids);
    // セッションIDっぽい物
    var a = document.querySelector('a[href*=t_id]');
    var m = a.href.match(/t_id%3D([0-9a-f]+)%26/);
    var t_id = m[1];

    location.href = mbgaUrl(
      'http://125.6.169.35/idolmaster/trade_request/add_other_card?t_id='
      + t_id + '&s_id=' + s_id);
  }

  // アイドル一覧ページを加工する
  var arrangeIdolList = function() {
    var checkboxes = [];
    eachIdolArea(function(div) {
      // アイドルの id
      var a = div.querySelector(':link');
      if (!a) return;
      var m = a.href.match(/s_id%3D([0-9a-f]+)%26/);
      if (!m) return;
      var s_id = m[1];
      // チェックボックス
      var cb = E('input', {type: 'checkbox', value: s_id});
      checkboxes.push(cb);
      div.querySelector('div span').insertAdjacentElement('beforebegin', cb);
      div.addEventListener('click', function(e) {
        cb.checked = !cb.checked;
      }, false);
      // クラスを付けておく
      div.className = 'batch-trade-idol';
    });
    insertButtons(checkboxes);
  }

  function insertButtons(checkboxes) {
    // はい
    var createButtons = function() {
      // return 直後で改行していたらそこで文が終わってしまっていた
      return E(
        'div',
        E('button', '上から9人チェック',
          function() {
            this.addEventListener('click', function(e) {
              for (var i = 0; i < checkboxes.length && i < 9; ++i) {
                checkboxes[i].checked = true;
              }
            }, false);
          }),
        E('button', 'まとめて追加',
          function() {
            this.addEventListener('click', function(e) {
              var ids = [];
              for (var i = 0; i < checkboxes.length; ++i) {
                if (checkboxes[i].checked)
                  ids.push(checkboxes[i].value);
              }
              save(ids);
              selectNextIdol();
            }, false);
          }));
    }
    console.log('createButtons', createButtons());
    var divs = document.querySelectorAll('.batch-trade-idol');
    divs[0].insertAdjacentElement('beforebegin', createButtons());
    divs[divs.length-1].insertAdjacentElement('afterend', createButtons());
    //document.body.appendChild(buttons);
  }

  var url = originalUrl();
  if (trading()) {
    if (url.indexOf('select_other_card') >= 0) {
      selectNextIdol();
    }
    // 選んだもの一覧
    else if (url.indexOf('select_top') >= 0) {
      location.href = mbgaUrl(
        'http://125.6.169.35/idolmaster/trade_request/select_other_card');
    }
    else {
      save(null);
      alert("まとめてトレード中に予期せぬ事が起こりました");
    }
  }
  else if (url.indexOf('select_other_card') >= 0) {
    arrangeIdolList();
  }
});

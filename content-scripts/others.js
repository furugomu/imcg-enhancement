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

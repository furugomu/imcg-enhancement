var title = '';
// http://125.6.169.35/idolmaster/この部分?rnd=1
switch (originalUrl().split(/[/?#]/)[4]) {
case '':
  title = 'トップ'; break;
case 'mypage':
  title = 'マイスタジオ'; break;
case 'gacha':
  title = 'ガチャ'; break;
case 'theater':
  title = '劇場'; break;
case 'profile':
  title = document.querySelector('a[href^="http://mbga.jp/.maf0f"]').textContent;
  break;
case 'knights': // プロダクション
  title = document.querySelector('.productionArea').textContent;
  break;
case 'p_reward_chance':
  title = 'メダルチャンス'; break;
default:
  var e = document.querySelector('.area_name');
  if (e) title = e.textContent.trim();
}
if (title.length > 0) {
  document.title = title + ' - ' + document.title;
}

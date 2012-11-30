getOption("multi-column", function(multi) {
  if (!multi) return;
  document.body.className += ' multi-column';
  var columnCount = Math.floor(window.innerWidth / 320);
  document.body.style.WebkitColumnCount = columnCount;
  //document.body.style.columnCount = columnCount;
});

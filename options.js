document.addEventListener("DOMContentLoaded", function(event) {
  // セーブデータを input につっこむ
  var inputs = document.getElementsByTagName("input");
  for (var i = 0; i < inputs.length; ++i) {
    var input = inputs[i];
    if (!input.name) continue;
    loadValueToInput(input);
  }
}, false);

// 入力したら保存する
document.addEventListener('change', function(e) {
  var value = null;
  if (e.target.type === "checkbox") {
    value = e.target.checked;
  }
  else {
    value = e.target.value;
  }
  console.log(e.target.name, value);
  localStorage.setItem(e.target.name, JSON.stringify(value));
}, false);

function loadValueToInput(input) {
  chrome.extension.sendRequest({option: input.name}, function(value) {
    console.log("load", input.name, value);
    if (input.type === "checkbox" || input.type === "radio") {
      input.checked = !!value;
    }
    else {
      input.value = value;
    }
  });
}

//刪除前再次確認
function deleteCheckAgain() {
  return window.confirm('Do you really want to delete this restaurant ?')
}

function editCheckAgain() {
  return window.confirm('Do you really want to send these information ?')
}


const btnCopy = document.querySelector('.btn-copy')

btnCopy.addEventListener('click', function (event) {
  // 取得有 .copy-area 類別的元素
  const copyArea = document.querySelector('.copy-text');
  var range = document.createRange();
  range.selectNode(copyArea);
  // 選取裡面的文字
  window.getSelection().addRange(range);
  try {
      // 執行瀏覽器的複製指令，複製上面 copyArea 內選取到的文字
      var copyStatus = document.execCommand('copy');
      var msg = copyStatus ? 'copied' : 'failed';
      // 輸出狀態
      console.log(msg);
  } catch (error) {
      console.log('Oops!, unable to copy');
  }
  // 移除選取
  window.getSelection().removeAllRanges();
})

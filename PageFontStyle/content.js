// 送event到eventPage.js
chrome.runtime.sendMessage({ todo: "showPageAction" })

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.todo === 'changeColor') {
    let addColor = "#" + request.clickedColor
    $('.api').css('color', addColor)
  }
})
// 收到來自content.js的事件
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.todo === "showPageAction") {
    chrome.tabs.query({
      // 選特定分頁
      active: true, // 目前分頁
      currentWindow: true // 目前視窗
    }, (tabs) => {
      // 在選定的分頁highlight extension
      chrome.pageAction.show(tabs[0].id)
    })
  }
})
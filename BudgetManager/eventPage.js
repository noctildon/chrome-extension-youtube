// 定義context menu 物件
let contextMenuItem = {
  id: 'spendMoney',
  title: 'SpendMoney',
  contexts: ['selection'] //只有在選定網頁內容,然後在按右鍵時才會出現
}

// 在chrome extenion中建立context menu物件
chrome.contextMenus.create(contextMenuItem)

// 監聽滑鼠點擊事件, clickDat相當於上面定義的context menu物件
chrome.contextMenus.onClicked.addListener((clickData) => {
  // clickData.selectionText是user在網頁上選起來的東西
  if (clickData.menuItemId === 'spendMoney' && clickData.selectionText) {
    target = parseInt(clickData.selectionText)

    chrome.storage.sync.get(['total', 'limit'], (budget) => {
      let newTotal = 0
      if (budget.total) {
        // 已儲存的total
        newTotal += parseInt(budget.total)
      }

      // 加上user所選的價格
      newTotal += target

      chrome.storage.sync.set({ 'total': newTotal }, () => {
        if (newTotal >= budget.limit) {
          let notifOptions = {
            // 每個項目都必填
            type: 'basic',
            iconUrl: 'icon.svg',
            title: 'Limite reached!',
            message: 'You reach your limit'
          }
          // 第一個是id,第2是提示object
          chrome.notifications.create('limitNotif', notifOptions)
        }
      })
    })
  }
})


// 當chrome儲存的資料變化時,觸發事件
chrome.storage.onChanged.addListener((changes, storageName) => {
  // 設定badge(會在icon下方顯示)
  chrome.browserAction.setBadgeText({ text: changes.total.newValue.toString() })
})
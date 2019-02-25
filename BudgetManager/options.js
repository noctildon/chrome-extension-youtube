$(function() {
  chrome.storage.sync.get('limit', (budget) => {
    $('#limit').val(budget.limit)
  })

  $('#saveLimit').click(() => {
    let limit = $('#limit').val()
    if (limit) {
      chrome.storage.sync.set({ 'limit': limit }, () => {
        close() // limit寫入完成後,關閉分頁
      })
    }
  })

  $('#resetTotal').click(() => {
    chrome.storage.sync.set({ 'total': 0 }, () => {
      let notifOptions = {
        // 每個項目都必填
        type: 'basic',
        iconUrl: 'icon.svg',
        title: 'Total reset',
        message: 'Total has been reset to 0'
      }
      // 第一個是id,第2是提示object
      chrome.notifications.create('limitNotif', notifOptions)
    })
  })
})
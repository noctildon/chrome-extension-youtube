$(function() {
  // 讀取存在chrome裡面的data
  chrome.storage.sync.get(['total', 'limit'], (budget) => {
    $('#total').text(budget.total)
    $('#limit').text(budget.limit)
  })

  // when 'spend' button is clicked
  $('#spendAmount').click(() => {
    chrome.storage.sync.get(['total', 'limit'], (budget) => {
      let newTotal = 0
      if (budget.total) {
        newTotal += parseInt(budget.total)
      }

      let amount = $('#amount').val()
      if (amount) {
        newTotal += parseInt(amount)
      }

      // save value
      chrome.storage.sync.set({
        'total': newTotal
      }, () => {
        if (amount && newTotal >= budget.limit) {
          // 定義一個提示object
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

      $('#total').text(newTotal)
      $('#amount').val('')
    })
  })
})
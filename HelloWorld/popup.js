$(function() {
  $('#name').keyup(function() { // 使用者輸入的字串
    $('#greet').text('Hello ' + $('#name').val())
  })
})
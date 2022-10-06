$(document).ready(function () {
  $('.h-header dl .horizo').click(function () {
    $(this).find('a').toggleClass('curr')
    if ($(this).find('a').hasClass('curr')) {
      $('.h-header dl nav').slideDown()
    } else {
      $('.h-header dl nav').slideUp()
    }
  });
  setInterval(function () {
    var time = new Date();
    $('.time1').text('当前时间 ： ' + time.getFullYear() + '-' + (time.getMonth() + 1) + '-' + time.getDate() + '   ' + time.getHours() + ':' + time.getMinutes() + ':' + time.getSeconds());
  }, 1000);
})
$(document).ready(function() {
  $(".tweetarea").keyup(function(e) {
    const charLength = e.target.value.length;
    $(".counter").text(140 - charLength);
    if (charLength > 140) {
      $('.counter').css('color', 'red');
    } else {
      $('.counter').css('color', 'black');
    }
  });
});
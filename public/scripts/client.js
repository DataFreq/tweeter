/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
$(document).ready(function () {
  const renderTweets = (data) => {
    data.map((tweet) =>
      $("#tweets-container").prepend(createTweetElement(tweet))
    );
  };
  const createTweetElement = (data) => {
    const tweetTime = timeago.format(data.created_at);
    const userAvatar = data.user.avatars;
    const name = data.user.name;
    const handle = data.user.handle;
    const tweet = data.content.text;
    //create header Element
    const $header = $("<header>");
    $header.append(
      $('<img>').addClass("tweet-avatar").attr("src",userAvatar),
      $('<p>').addClass("name").text(name),
      $('<p>').addClass("username").text(handle)
    );
    //create tweet element
    const $createTweet = $('<p>').addClass("user-tweet").text(tweet);
    //create footer element
    const $footer = $("<footer>");
    $footer.append(
      $("<p>").text(tweetTime),
      $("<i>").addClass("fas fa-flag"),
      $("<i>").addClass("fas fa-retweet"),
      $("<i>").addClass("fas fa-heart")
    );
    //create full tweet element
    const $tweetData = $("<article>").addClass("tweet");
    $tweetData.append($header, $createTweet, $footer);
    return $tweetData;
  };
  $("form").submit((event) => {
    event.preventDefault();
    const newTweet = $("textarea").serialize();
    const charLength = $("textarea", this).val().length;
    if (!charLength) {
      alert("[ERR] Textarea empty!");
    }
    if (charLength > 140) {
      alert("[ERR] Over character limit!");
    }
    if (newTweet && charLength <= 140) {
      $.ajax({
        type: "POST",
        url: "/tweets",
        data: newTweet,
      }).done(() => {
        loadTweets();
        $("textarea", this).val("");
        $("output").val(140);
      });
    }
  });
  const loadTweets = () => {
    $.ajax({
      type: "GET",
      url: "/tweets",
      dataType: "JSON",
    }).done((data) => {
      renderTweets(data);
    });
  };
  loadTweets();
});

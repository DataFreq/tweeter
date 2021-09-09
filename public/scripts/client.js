/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function() {  
  const renderTweets = data => {
    data.map(tweet => $('#tweets-container').prepend(createTweetElement(tweet)));
  };

  const createTweetElement = data => {
    const tweetTime = timeago.format(data.created_at);
    const markup = `
      <article class="tweet">
        <header>
          <img class="tweet-avatar" src="${data.user.avatars}">
          <p class="name">${data.user.name}</p>
          <p class="username">${data.user.handle}</p>
        </header>
          <p class="user-tweet">${data.content.text}</p>
        <footer>
          <p>${tweetTime}</p>
          <i class="fas fa-flag"></i>
          <i class="fas fa-retweet"></i>
          <i class="fas fa-heart"></i>
        </footer>
      </article>
    `;
    return markup;
  };
  
  $('form').submit( event => {
    event.preventDefault();
    const newTweet = $('textarea').serialize()

    if (!$('textarea', this).val().length) {
      return alert("[ERR] Textarea empty!");
    };

    if (newTweet.length > 140) {
      return alert("[ERR] Over character limit!");
    };

    if (newTweet && newTweet.length <= 140) {
      $.ajax({
        type: 'POST',
        url: '/tweets',
        data: newTweet,
      }).done(() => {
        loadTweets();
      })
    };
  });

  const loadTweets = () => {
    $.ajax({
      type: 'GET',
      url: '/tweets',
      dataType: 'JSON',
    }).done( data => {
      renderTweets(data)
    });
  };

  loadTweets();
});

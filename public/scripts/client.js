/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function() {
  // const tweetData =  [
  //   {
  //     "user": {
  //       "name": "Newton",
  //       "avatars": "https://i.imgur.com/73hZDYK.png"
  //       ,
  //       "handle": "@SirIsaac"
  //     },
  //     "content": {
  //       "text": "If I have seen further it is by standing on the shoulders of giants"
  //     },
  //     "created_at": 1461116232227
  //   },
  //   {
  //     "user": {
  //       "name": "Descartes",
  //       "avatars": "https://i.imgur.com/nlhLi3I.png",
  //       "handle": "@rd" },
  //     "content": {
  //       "text": "Je pense , donc je suis"
  //     },
  //     "created_at": 1461113959088
  //   }
  // ];
  
  const renderTweets = data => {
    data.map(tweet => $('#tweets-container').append(createTweetElement(tweet)));
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
    
    $.ajax({
      type: 'POST',
      url: '/tweets',
      data: $('textarea').serialize(),
    })
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

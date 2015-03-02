  'use strict';

  $(document).ready(function() {
  $.ajax({
    url: 'http://localhost:3000/posts',
    type: 'GET',
    dataType: 'JSON'
  })
  .done(function(posts) {

    var $postsDiv = $('#posts');
    for (var i = 0; i < posts.length; i++) {
      console.log(posts[i].title);


      $postsDiv = $("<div>");


      $postsDiv.text(posts[i].title);


      $postsDiv.append('#posts');
    };
  });
});

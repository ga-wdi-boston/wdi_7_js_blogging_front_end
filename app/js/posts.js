'use strict';

var Post = Post || {};

Post.getPosts = function(){
  $.ajax({
    url: "'http://localhost:9000/",
    type: "GET",
    dataType: 'json'

  }).done(Post.postCallbackHandler);
};


Post.postCallbackHandler = function(posts){
var postsHTML = '';
for(var i = 0; i < posts.length; i++){

}

};

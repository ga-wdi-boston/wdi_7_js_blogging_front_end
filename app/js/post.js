'use strict';

var App = App || {};

App.submitPost = function ( event ) {
  event.preventDefault();
  $.ajax({
    url: 'http://localhost:3000/posts',
    type: 'POST',
    dataType: 'JSON',
    data: {
      post: {
        title: $('#post-title').val(),
        body: $('#post-body').val()
      }
    },
    headers: {'AUTHORIZATION': 'c02ed61e60cb4220b421db4f52ab70b0'}
  }).done(function(jqXHR, textStatus, errorThrown) {
    console.log(jqXHR, textStatus, errorThrown);
  }).fail(function(jqXHR, textStatus, errorThrown) {
    console.log(jqXHR, textStatus, errorThrown);
  });
  return false;
};

App.Post = function ( remotePost ) {
  this.title = remotePost.title;
  this.body = remotePost.body;
  this.id = remotePost.id;
};

App.Post.prototype.render = function ( remotePost ) {
  var html = "<div class='posts-" + remotePost.id + "'>";
    html += '<h3>' + remotePost.title + '</h3>';
    html += '<article>' + remotePost.body + '</article>';
    html += '</div>';
    return html;
};

App.getAllPosts = function () {
  $.ajax({
    url: 'http://localhost:3000/posts',
    type: 'GET',
    dataType: 'JSON'
  }).done(App.getAllPosts.postsHandler);
};

// App.getPost = function () {
//   $.ajax({
//     url: 'http://localhost:3000/posts' + id,
//     type: 'GET',
//     dataType: 'JSON'
//   }).done(function(data){
//     console.log(data);
//   })
// };

App.postsHandler = function ( remotePosts ) {
  var html = '<div>';
  var post;

  remotePosts.forEach(function(remotePost) {
    post = new App.Post(remotePost);
    html += post.render();
  });
  html += '</div>';
  $('#posts').append(html);
};
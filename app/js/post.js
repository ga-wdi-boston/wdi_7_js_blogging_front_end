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

App.Post.prototype.render = function () {
  var html = "<div class='posts-" + this.id + "'>";
    html += '<h3>' + this.title + '</h3>';
    html += '<article>' + this.body + '</article>';
    html += '</div>';
    return html;
};

App.PostList = {
  get: function(){
    $.ajax({
      url: 'http://localhost:3000/posts',
      dataType: 'JSON'
    }).done(App.PostList.postsHandler);
  },
  postsHandler: function ( remotePosts ){
    var html = '<div>', post;

    remotePosts.forEach(function(remotePost) {
    post = new App.Post(remotePost);
    html += post.render();
  });
  html += '</div>';
  $('#posts').append(html);
  }
};

// attempt #1 - not quite sure why either wouldn't be working...
// App.getAllPosts = function () {
//   $.ajax({
//     url: 'http://localhost:3000/posts',
//     type: 'GET',
//     dataType: 'JSON'
//   }).done(App.getAllPosts.postsHandler);
// };

// App.getPost = function () {
//   $.ajax({
//     url: 'http://localhost:3000/posts' + id,
//     type: 'GET',
//     dataType: 'JSON'
//   }).done(function(data){
//     console.log(data);
//   })
// };

// App.postsHandler = function ( remotePosts ) {
//   var html = '<div>';
//   var post;

//   remotePosts.forEach(function(remotePost) {
//     post = new App.Post(remotePost);
//     html += post.render();
//   });
//   html += '</div>';
//   $('#posts').append(html);
// };

App.deletePost = function( remotePost) {
  $.ajax({
    url: 'http://localhost:3000/posts/' + remotePost.id,
    type: 'DELETE',
    dataType: 'JSON',
  }).done(function(){
    console.log('post deleted');
  });
  return false;
};

App.updatePost = function ( id ) {
  $.ajax({
    url: 'http://localhost:3000/posts/' + id,
    type: 'PATCH',
    dataType: 'JSON',
    data: {
      post: {
        title: '',
        body: ''
      }
    },
  }).done(function(){
    console.log('post updated');
  });
  return false;
};


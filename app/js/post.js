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
        body: $('#post-body').val(),
        category: $('#post-category').val()
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
  this.categories = remotePost.categories;
};

App.Post.prototype.render = function () {
  var html = "<div class='posts-" + this.id + "'>";
  html += '<h3>' + this.title + '</h3>';
  html += '<article>' + this.body + '</article>';
  html += '</div>';
  return html;
};

App.PostList = {
  get: function() {
    $.ajax({
      url: 'http://localhost:3000/posts',
      dataType: 'JSON'
    }).then(App.PostList.postsHandler);
  },
  postsHandler: function ( remotePosts ) {
    $('.posts').append(remotePosts.map( function renderPost( post ) {
      return new App.Post( post ).render();
    }).join(''));
  }
};

App.deletePost = function( remotePost ) {
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
  }).done(function() {
    console.log('post updated');
  });
  return false;
};


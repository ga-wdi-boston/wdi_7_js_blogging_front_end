/*global $:false*/
'use strict';

var App = App || {
  $posts: $('.posts'),
};

$(document).ready(function(){
  trace('hello world');
});

App.post = function(id, title, body, created_at, categories){
  this.id = id;
  this.title = title;
  this.body = body;
  this.created_at = created_at;
  this.categories = categories;
};

App.displayPosts = function(event){
  if(event.preventDefault) event.preventDefault();
  $.ajax({
    url: 'http://localhost:3000/posts',
    type: 'GET'
    }).done(function(posts){
      posts.reverse().forEach(App.addPost);
      renderButtons(posts);
    }).fail(function(jqXHR, textStatus, errorThrown){
    });
    return false;
  };

App.addPost = function(post){
  var post = new App.post(post.id, post.title, post.body, post.created_at, post.categories);
  var postHTML = '';
  post.categories.forEach(function(post){postHTML += post.id + ' '});
  var $newPostHTML = $('<div class=post id='+ post.id + ' data-categories="' + postHTML + '">');
  $newPostHTML.html('<h3>' + post.title + '</h3>' + '<p>' + post.body);
  App.$posts.prepend($newPostHTML);
  };

App.deletePost = function(post_id){
  $.ajax({
    url: 'http://localhost:3000/posts/' + parseInt(post_id),
    type: 'DELETE',
    headers: {'AUTHORIZATION': '109885dca2fc451fbca7d7795ff65355'},
  }).done(function(posts){
    trace(posts);
    $('.post#'+ parseInt(post_id)).remove(); // parseInt converts the integer to a string
  }).fail(function(jqXHR, textStatus, errorThrown){
    trace(jqXHR, textStatus, errorThrown);
  });
};

var trace = function(){
  for(var i = 0; i < arguments.length; i++){
    console.log(arguments[i]);
  }
};

var renderButtons = function(posts){
  for(var i = 0, max = posts.length; i < max; i++){
  var buttonHTML = '<input type=button class=edit id=' + posts[i].id + ' value="Edit Post" >' + '<input type=button class=delete id=' + posts[i].id + ' value="Delete Post" >';
    $('#' + posts[i].id).append(buttonHTML);
    buttonEventHandler(posts[i].id);
  }
};

var buttonEventHandler = function(){
  var $editButtons = $('.edit');
      $editButtons.on('click', function(){
        App.editPost(this.id);
      });
  var $deleteButtons = $('.delete');
      $deleteButtons.on('click', function(){
        App.deletePost(this.id);
      });
};

$('document').ready(function(){
    App.displayPosts(event);

    var $postForm = $('form#new-post-form');
    $postForm.on('submit', function(event){
      App.deletePost(event);
  });

});
/*"109885dca2fc451fbca7d7795ff65355"*/

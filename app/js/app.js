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
  if(event.preventDefault) event.preventDefault();
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

App.updatePost = function(post_id, post, new_title, new_body){
  if(event.preventDefault) event.preventDefault();
  $.ajax({
    url: 'http://localhost:3000/posts/' + parseInt(post_id),
    type: 'PATCH',
    headers: {'AUTHORIZATION': '109885dca2fc451fbca7d7795ff65355'},
    data: {
      post: {
      title: new_title,
      body: new_body,
      },
    },
  }).done(function(post){
    trace(post)
    post.html('<h3>' + new_title + '</h3>' + '<p>' + new_body + '</p>' + '<input type=button class=edit id=' + post_id + ' value="Edit Post" >' + '<input type=button class=delete id=' + post_id + ' value="Delete Post" >');
    // buttonEventHandler();
  }).fail(function(jqXHR, textStatus, errorThrown){
    trace(jqXHR, textStatus, errorThrown);
  });
};

App.editPost = function(post_id){
  var $editButtons = $('.edit');
  $editButtons.unbind();

  var $newTitle, $newBody;
  var $title = $('#' + post_id + '.post h3').text();
  var $body = $('#' + post_id + '.post :not(h3)').text(); // :not removes elements from the set of matched elements
  var $post = $('#' + post_id + '.post');
  var postHTML = $post.html();

  $post.html('<div class="post-form"><form id="edit-post-form"><div class="form-group"><input name="post-title" type="text" value="'+ $title +'" id=' + post_id + '></div><div class="form-group"><label for="post-body">Post Body</label><textarea name="post-body" id="post-body">' + $body + '</textarea></div><div class="form-group"><input type="button" id="save" value="Save Post" /><input type="button" id="cancel" value="Cancel" /></div></form></div>');

  var $saveButton = $('#save');
      $saveButton.on('click', App.updatePost(post_id, $post, $newTitle, $newBody));

  var $cancelButton = $('#cancel');
      $cancelButton.on('click', function(){
        $post.html(postHTML);
        buttonEventHandler();
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

/*global $:false*/
'use strict';

var trace = function(){
  for(var i = 0; i < arguments.length; i++){
    console.log(arguments[i]);
  }
};

var App = App || {
  $posts: $('.posts')
};


App.submitUser = function(event, form){
  if (event.preventDefault) event.preventDefault();
  $.ajax({
    url: 'http://localhost:3000/users',
    type: 'POST',
    dataType: 'JSON',
    data: {
      user: {
        username: $('#username').val(),
        email: $('#email').val(),
        password: $('#password').val(),
        password_confirmation: $('#passwordconfirmation').val(),
        role: $('#role').val(),
        first_name: $('#firstname').val(),
        last_name: $('#lastname').val()
      }
    },
    success: function(data, textStatus, jqXHR){
      trace('I made a new user!!!!', data, textStatus, jqXHR);
      $('#user-form .clear-me').val('');
    }
  }).done(function(data){
    trace(data);
  }).fail(function(jqXHR, textStatus, errorThrown){
    trace(jqXHR, textStatus, errorThrown);
  });
};

App.submitPost = function(event){
  if (event.preventDefault) event.preventDefault();
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
    headers: {'AUTHORIZATION': '995c3568de8549b687dede7c6a96eb75'},
  }).done(function(data){
    trace(data);
    App.addOnePost(data);
    $('#new-post-form .clear-me').val('');

  }).fail(function(jqXHR, textStatus, errorThrown){
    trace(jqXHR, textStatus, errorThrown);
  });
  return false;
};

App.Post = function(id, title, body, created) {
  this.id = id;
  this.title = title;
  this.body = body;
  this.created_at = created;
};

App.addOnePost = function(post){
  var newPost = new App.Post(post.id, post.title, post.body, post.created_at);
  var $newPostHTML = $('<div class=post>');
  $newPostHTML.html('<h3>' + post.title + '</h3>' + '<p>' + post.body + '</p>');
  App.$posts.prepend($newPostHTML);
};

App.getAllPosts = function(){
  $.ajax({
    url: 'http://localhost:3000/posts',
    type: 'GET'
  })
  .done(function(data){
    data.reverse().forEach(App.addOnePost);
  })
};



$(document).ready(function(){
  App.getAllPosts();

  var $userForm = $('form#user-form');
  $userForm.on('submit', function(event){
    App.submitUser(event,$userForm);
  });

  var $postForm = $('form#new-post-form');
  $postForm.on('submit', function(event){
    App.submitPost(event);
  });

});

//"995c3568de8549b687dede7c6a96eb75"

/*global $:false*/
'use strict';

var trace = function(){
  for(var i = 0; i < arguments.length; i++){
    console.log(arguments[i]);
  }
};

var App = App || {};


App.submitUser = function(event, form){
  if(event.preventDefault) event.preventDefault();
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
        last_name: $('#lastname').val(),
      }
    },
    success: function(data, textStatus, jqXHR){
      trace('I made a thing!', data, textStatus, jqXHR);
    },
  }).done(function(data){
    trace(data);
  }).fail(function(jqXHR, textStatus, errorThrown){
    trace(jqXHR, textStatus, errorThrown);
  });
};

App.submitPost = function(event){
  if(event.preventDefault) event.preventDefault();
  $.ajax({
    url: 'http://localhost:3000/posts',
    type: 'POST',
    dataType: 'JSON',
    data: {
      post: {
        title: $('#post-title').val(),
        body: $('#post-body').val(),
        categories: $('#post-category').val()
      }
    },
    headers: { 'AUTHORIZATION': 'f3fecb71d91d4cde9cfa068747191af7'},
  }).done(function(data){
    trace(data);
  }).fail(function(jqXHR, textStatus, errorThrown){
    trace(jqXHR, textStatus, errorThrown);
  });
  return false;
};

App.render_all_posts = function(posts){
  var postsHTML = '<ul>';

  for(var i = 0; i < posts.length; i++){
    postsHTML += '<li id=post_' + posts[i].id + '>';
    postsHTML += '<h3>' + posts[i].title + '</h3>';
    if (posts[i].categories.length > 0){
      posts[i].categories.forEach(function(category){
        postsHTML += '<h4>' + category.name + '</h4>'
      });
    }
    postsHTML += '<div>' + posts[i].body + '</div>';
    postsHTML += '</li>';
  };
  $('.posts').append(postsHTML);
};

$(document).ready(function(){

  var get_all_posts = function(){
    $.ajax({
      url: 'http://localhost:3000/posts',
      type: 'GET'
    }).success(function(data){
      console.log("look at all the things!");
      console.table(data);
      App.render_all_posts(data);
    });
  };
  var $userForm = $('form#user-form');
  $userForm.on('submit', function(event){
    App.submitUser(event, $userForm);
  });

  var $postForm = $('form#new-post-form');
  $postForm.on('submit', function(event){
    App.submitPost(event);
  });
  trace(get_all_posts())
  trace('hello world');
});


// HW! Create Blog. get all the posts and create crud actions for the posts. Create category, delete category.

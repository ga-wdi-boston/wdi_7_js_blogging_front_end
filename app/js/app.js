// uniqueness contraint : must have a different email address
//bob below
// token 6014463b83fa4fefa80ea5ff0073557d

/*global $:false*/
'use strict';

var trace = function(){
  for(var i = 0; i < arguments.length; i++){
    console.log(arguments[i]);
  }
};

var App = App || {};

App.getUsers = function(){
  $.ajax({
    url: 'http://localhost:3000/users',
    type: 'GET',
    dataType: 'JSON',
  }).done(function(user){
    console.log("sucess getUsers");
    console.table(user);
    App.renderUsers(user);
  });

};

App.renderUsers = function(users){
  for (var i = 0; i < users.length; i++) {
    App.renderUser(users[i]);
  }
  App.renderPosts(users);
};

App.renderUser = function(user){
  $('#posts').append('<p>' + "User: " + user.username + '</p>');
};

App.renderPosts = function(user){

  for (var i = 0; i < user.length; i++) {
    var first_username = user[i].username
    var first_post_t = user[i].posts[0].title;
debugger;
  };
  $('#posts').append('<p>' + "Most recent User and Post" + '<br>' + "User: " + first_username + '<br>' + "Recent post: " + first_post_t + '</p>');
};


App.submitUser = function(event, form){
  if(event.preventDefault) event.preventDefault();
  $.ajax({
    url: 'http://localhost:3000/users',
    type: 'POST',
    dataType: 'JSON',
    data: {
      user:{
        username: $('#username').val(),
        email: $('#email').val(),
        password: $('#password').val(),
        password_confirmation: $('#passwordconfirmation').val(),
        role: $('#role').val(),
        first_name: $('#firstname').val(),
        last_name: $('#lastname').val(),
      }

    },
    sucess: function(data, textStatus, jqXHR){
      trace('I name a new user', data, textStatus, jqXHR);
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
        body: $('#post-body').val()
      }
    },
    headers: { 'AUTHORIZATION': '6014463b83fa4fefa80ea5ff0073557d' },
  }).done(function(data){
    trace(data);
  }).fail(function(jqXHR, textStatus, errorThrown){
    trace(jqXHR, textStatus, errorThrown);
  });
  return false;
};

App.submitCategory = function(event){
if(event.preventDefault) event.preventDefault();
  $.ajax({
    url: 'http://localhost:3000/categories',
    type: 'POST',
    dataType: 'JSON',
    data: {
      category: {
        name: $('#category').val()
      }
    },
    // headers: { 'AUTHORIZATION': '6014463b83fa4fefa80ea5ff0073557d' },
  }).done(function(data){
    console.log(data);
  }).fail(function(jqXHR, textStatus, errorThrown){
    console.log(jqXHR, textStatus, errorThrown);
    console.log('fail');
  });
};

$(document).ready(function(){
  var $userForm = $('form#user-form');
  $userForm.on('submit', function(event){
    App.submitUser(event,$userForm);
  });
  var $postForm = $('form#new-post-form');
  $postForm.on('submit', function(event){
    App.submitPost(event);
  });
  trace('hello world');

  var $categoryForm = $('form#category-form');
  $categoryForm.on('submit', function(event){
    App.submitCategory(event);
  });

  $('#button1').on('click', App.getUsers);


});

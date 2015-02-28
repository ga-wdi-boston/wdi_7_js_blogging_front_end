

/*global $:false*/
'use strict';

var App = App || {};

var trace = function(){
  for(var i = 0; i < arguments.length; i++){
    console.log(arguments[i]);
  }
};

App.submitUser = function(event, form){
    if(event.preventDefault) event.preventDefault();
    $.ajax({
      url: 'http://localhost:3000/users',
      type: 'POST',
      dataType: 'JSON',
      data:{
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
      success: function(data, textStatus,jqXHR){
        trace('I made a new User', data, textStatus,jqXHR);
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
    headers: {'AUTHORIZATION': 'b254f0ae13c04cff89f80092b9664908'},
  }).done(function(data){
    trace(data);
  }).fail(function(jqXHR, textStatus, errorThrown){
    trace(jqXHR, textStatus, errorThrown);
  });
  return false;
};

App.getAllUsers = function(){
  $.ajax({
    url: 'http://localhost:3000/users',
    type: 'GET',
    dataType: 'JSON',
  })
  .done(function(data) {
    console.log("success");
    App.listAllUsers(data);
  })
  .fail(function() {
    console.log("error");
  });
};

App.listAllUsers = function(users){
  for (var i = 0; i < users.length; i++) {
    App.showUser(users[i]);
  };
};

App.showUser = function(user){
  var html = '';
  html += '<h3>' + user.name + '</h3>';
  html += '<p>' + user.about + '</p>';
  html += '<p>' + user.email + '</p>';
  $('.users').append(html);
};

App.getAllPosts = function(){
  $.ajax({
    url: 'http://localhost:3000/posts',
    type: 'GET',
    dataType: 'JSON'
  })
  .done(function(data) {
    trace(data);
    App.listAllPosts(data);
  })
  .fail(function(jqXHR, textStatus, errorThrown){
    trace(jqXHR, textStatus, errorThrown);
  });
};

App.listAllPosts = function(posts){
  for (var i = 0; i < posts.length; i++) {
    App.showPost(posts[i]);
  }
};

App.showPost = function(post){
  var html = '';
  html += '<div>';
  html += '<h3>' + post.title + '</h3>';
  html += '<p>' + post.body + '</p>';
  html += '</div>';
  $('.posts').append(html);
};

$(document).ready(function(){
  var $userForm = $('form#user-form');
  $userForm.on('submit', function(event){
    App.submitUser(event, $userForm);
  });
  var $postForm = $('form#new-post-form');
  $postForm.on('submit',function(event){
    App.submitPost(event);
  });

  App.getAllPosts();
  App.getAllUsers();

  $('form#new-post-form').on('submit', App.getAllPosts);

  trace('Hello World');
});

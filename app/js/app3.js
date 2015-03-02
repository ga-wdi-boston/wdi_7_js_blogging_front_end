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
        last_name: $('#lastname').val()
      }
    },
    success: function(data, textStatus, jqXHR){
      trace("I made a new user!", data, textStatus, jqXHR);
    }
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
    headers: {'AUTHORIZATION': '7f4cb285120a4e169ae96b42245f84d2'},
  }).done(function(data){
    trace(data);
  }).fail(function(jqXHR, textStatus, errorThrown){
    trace(jqXHR, textStatus, errorThrown);
  });
};

$(document).ready(function(){
  var $userForm = $('form#user-form');
  $userForm.on('submit', function(e){
    App.submitUser(event, $userForm);
  });

  var $postForm = $('form#new-post-form');
  $postForm.on('submit', function(event){
    App.submitPost(event);
  });


  $(document).ready(function() {
  $.ajax({
    url: 'http://localhost:3000/posts',
    type: 'GET',
    dataType: 'JSON'
  })
  .done(function(posts) {

    var $postsDiv = $('#posts');
    for (var i = 0; i < posts.length; i++) {
      console.log(posts[i].title);

      //debugger;
      // Create a new jQuery object to represent a 'div'
      $postsDiv = $("<div>"); // $('<div>') creates a NEW div. $('div') finds all divs

      // Set the text of that div to be the user's name
      $postsDiv.text(posts[i].title);

      // Append this new div to the div with id 'users'
      $postsDiv.append('#posts');
    };
  });
});


   $(document).ready(function() {
  $.ajax({
    url: 'http://localhost:3000/users',
    type: 'GET',
    dataType: 'JSON'
  })
  .done(function(users) {

    var $usersDiv = $('#users');
    for (var i = 0; i < users.length; i++) {
      console.log(users[i].username);
      // Create a new jQuery object to represent a 'div'
      $usersDiv = $("<div>"); // $('<div>') creates a NEW div. $('div') finds all divs

      // Set the text of that div to be the user's name
      $usersDiv.text(users[i].username);

      // Append this new div to the div with id 'users'
      $usersDiv.append($usersDiv);
    };
  });
});



  trace("Hello World");
});


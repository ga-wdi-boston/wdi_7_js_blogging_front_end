/*global $:false*/
'use strict';

var trace = function(){
  for(var i = 0; i < arguments.length; i++){
    console.log(arguments[i]);
  }
};

var App = App || {};

//the entire ajax call is inside App.submitUser
App.submitUser = function(event, form){
  if(event.preventDefault) event.preventDefault();
  //single line if statement doesn't need curly braces!
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
      },
    },
    success: function(data, textStatus, jqXHR){
      trace('I made a new user!', data, textStatus, jqXHR);
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
        title:$('#post-title').val(),
        body:$('#post-body').val(),
      }
    },
    headers:{'AUTHORIZATION': 'c2d0063e717f4d52901b5fc16f7cb510'},

     }).done(function(data){
    trace(data);
  }).fail(function(jqXHR, textStatus, errorThrown){
     trace(jqXHR, textStatus, errorThrown);

  });
  return false
};

App.showAllPosts = function(event){
  $.ajax({
    url: 'http://localhost:3000/posts',
    type: 'GET',
    dataType: 'JSON'
  }).done(function(data){
    for (var i = 0; i < data.length; i++) {
      var html = "<div id='post-" + data[i].id + "'>";
      html += "<h3>" + data[i].title + "</h3>";
      html += "<p>" + data[i].body + "</p>";
      // html += "<img>" + data[i].img;
      $('.posts').append(html);
    }
  }).fail(function(jqXHR, textStatus, errorThrown){
    trace(jqXHR, textStatus, errorThrown);
  });
}

$(document).ready(function(){

  App.showAllPosts();


  var $userForm = $('form#user-form');
  $userForm.on('submit',function(event){
    App.submitUser(event,$userForm);
  });

  var $postForm = $('form#new-post-form');
  $postForm.on('submit', function(event){
      App.submitPost(event);
      });
  trace('hello world')
});






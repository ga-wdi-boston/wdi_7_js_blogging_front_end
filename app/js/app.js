/*global $:false*/
'use strict';

var trace = function(){
  for(var i = 0; i < arguments.length; i++){
    console.log(arguments[i]);
  }
};

var display = function(data){
  var string = '';
  for(var i = 0; i < data.length; i++){
    string += '<p>' + data[i].title + '</p>' + '<p>' + data[i].body + '</p>';
    $('.posts').html(string);
  };
};

var App = App || {};

App.submitUser = function(event, form){
  if(event.preventDefault) event.preventDefault();
  $.ajax({
    url: 'http://localhost:3000/users',
    type: 'POST',
    datatype: 'JSON',
    data: {
      user: {
        username: $('#username').val(),
        email: $('#email').val(),
        password: $('#password').val(),
        password_confirmation: $('`#passwordconfirmation').val(),
        role: $('#role').val(),
        first_name: $('#firstname').val(),
        last_name: $('#lastname').val()
      }
    },
    success: function(data, textStatus, jqXHR){
      trace('I made a new user!', data, textStatus, jqXHR);
      // $('form')[0].reset();
    },
  }).done(function(data){
    trace(data);
  }).fail(function(jqXHR, textStatus, errorThrown){
    trace(jqXHR, textStatus, errorThrown);
   });
  };

App.submitPost = function(event, form){
  if(event.preventDefault) event.preventDefault();
  $.ajax({
    url: 'http://localhost:3000/posts',
    type: 'POST',
    datatype: 'JSON',
    data: {
      post:{
        title: $('#post-title').val(),
        body: $('#post-body').val()
      }
   },
    headers: { 'AUTHORIZATION': '7629d6fdca39422582e71daa921234da' }
  }).done(function(data){
    trace(data);
  }).fail(function(jqXHR, textStatus, errorThrown){
    trace(jqXHR, textStatus, errorThrown);
  });
  return false;
};

App.displayPost = function(event){
  if(event.preventDefault) event.preventDefault();
  $.ajax({
    url: 'http://localhost:3000/posts',
    type: 'GET',
  }).done(function(data){
    trace(data);
    display(data);
  }).fail(function(jqXHR, textStatus, errorThrown){
    trace(jqXHR, textStatus, errorThrown);
  });
  return false;
};

App.submitCategory = function(event, form){
  if(event.preventDefault) event.preventDefault();
  $.ajax({
    url: 'http://localhost:3000/categories',
    type: 'POST',
    datatype: 'JSON',
    data: {
      category:{
        title: $('#category-title').val()
      }
   },
   headers: { 'AUTHORIZATION': '7629d6fdca39422582e71daa921234da' }
  }).done(function(data){
    trace(data);
  }).fail(function(jqXHR, textStatus, errorThrown){
    trace(jqXHR, textStatus, errorThrown);
  });
  return false;
};

$(document).ready(function(){
  // asking the DOM for the element with the ID of user-form
  var $userForm = $('form#user-form');
  $userForm.on('submit', function(event){
    App.submitUser(event,$userForm);
    // or e as shorthand for event.
  });

  var $postForm = $('form#new-post-form');
  $postForm.on('submit', function(event){
    App.submitPost(event);
  });
  trace('hello world');

  var $categoryForm = $('form#new-category-form');
  $categoryForm.on('submit', function(event){
    App.submitCategory(event);
  });

  App.displayPost(event);
});



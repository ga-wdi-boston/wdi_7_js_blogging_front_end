/*global $:false*/
'use strict';

var trace = function(){
  for(var i = 0; i < arguments.length; i++){
    console.log(arguments[i]);
  }
};

var App = App || {};

$(document).ready(function(){
  trace('hello world');
});

// always write out the entire structure of your function before you write it out

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
        password_confirmation: $('passwordconfirmation').val(),
        role: $('#role').val(),
        first_name: $('#firstname').val(),
        last_name: $('#lastname').val()
    }
  },
  success: function(data, textStatus, jqXHR){
    trace('I made a new user!!!', data, textStatus, jqXHR);
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
    headers: { 'AUTHORIZATION': "109885dca2fc451fbca7d7795ff65355" },
    }).done(function(data){
      trace(data);
    }).fail(function(jqXHR, textStatus, errorThrown){
    });
    return false;
  };

$('document').ready(function(){

  var $userForm = $('form#user-form');
  $userForm.on('submit', function(event){
    App.submitUser(event, $userForm);
  });

  var $postForm = $('form#new-post-form');
  $postForm.on('submit', function(event){
    App.submitPost(event);
  });
});
/*"109885dca2fc451fbca7d7795ff65355"*/

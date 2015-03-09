/*global $:false*/
'use strict';

var App = App || {};

App.submitUser = function(event, form){
  if(event.preventDefault) {event.preventDefault();}
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
      console.log('I made a new user!!!');
    },
  }).done(function(data){
    console.log(data);
  }).fail(function(jqXHR, textStatus, errorThrown){
    console.log(errorThrown);
  });
};

App.submitPost = function(event, form){
  if(event.preventDefault) {event.preventDefault();}
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
    headers: {'AUTHORIZATION': 'e4fdfb2b2e674ede93cc8204d38c0581'},
    success: function(data, textStatus, jqXHR){
      console.log('I made a new post!!');
    },
  }).done(function(data){
    console.log(data);
  }).fail(function(jqXHR, textStatus, errorThrown){
    console.log(errorThrown);
  });
  return false;
};

$(document).ready(function(){
  var $userForm = $('form#user-form');
  $userForm.on('submit', function(event){
    App.submitUser(event, $userForm);
  });
  var $postForm = $('form#new-post-form');
  $postForm.on('submit', function(event){
    App.submitPost(event, $postForm);
  });
});


// username: doug
// password: 1
// e4fdfb2b2e674ede93cc8204d38c0581

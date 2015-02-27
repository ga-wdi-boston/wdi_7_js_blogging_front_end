/*global $:false*/
'use strict';

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
        email: $("#email").val(),
        password: $('#password').val(),
        password_confirmation: $('#passwordconfirmation').val(),
        role: $('#role').val(),
        first_name: $('#firstname').val(),
        last_name: $('#lastname').val()
      }
    },
    success: function(data, textStatus, jqXHR){
      console.log('I made a user', data, textStatus, jqXHR);
    },
  }).done(function(data){
    console.log(data);
  }).fail(function(jqXHR, textStatus, errroThrown){
    console.log(jqXHR, textStatus, errroThrown);
  });
};

App.submitPost = function(event) {
  if(event.preventDefault) event.preventDefault();
  $.ajax({
    url: 'http://localhost:3000/posts',
    type: 'POST',
    dataType: 'JSON',
    data: {
      post: {
        title: $('#post-title').val(),
        body: $('#post-body').val(),

      }
    },
    headers: { 'AUTHORIZATION': '782547e399524cce8e9f62da07aac24e' },
  }).done(function(data) {
    trace(data);
  }).fail(function(data){
    trace(jqXHR, textStatus, errorThrown);
  });
  return false;
};

$(document).ready(function(){
  var $userForm = $('form#user-form');
  $userForm.on('submit', function(e){
    App.submitUser(e,$userForm);
  });
});

var $postForm = $('form#new-post-form');
$postForm.on('#submit', function(event) {
  App.submitPost(event);
});



//782547e399524cce8e9f62da07aac24e

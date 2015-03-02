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
          password_confirmation: $('#passwordConfirmation').val(),
          role: $('#role').val(),
          first_name: $('#firstname').val(),
          last_name: $('#lastname').val()
      }
    },
    success: function(data, textStatus, jqXHR){
      trace('I made a new user!!!', data, textStatus,jqXHR);
    }
  }).done(function(data){
    trace(data); // most important step
  }).fail(function(jqXHR, textStatus,errorThrown){
    trace(jqXHR, textStatus, errorThrown)
  });

  App.empty_fields();

};

App.empty_fields = function() {
  $('#username').val('');
  $('#email').val('');
  $('#password').val('');
  $('#passwordConfirmation').val('');
  $('#role').val('');
  $('#firstname').val('');
  $('#lastname').val('');
}

App.submitPost = function(event){


  if(event.preventDefault) event.preventDefault();
  $.ajax({
    url: 'http://localhost:3000/posts',
    type: 'POST',
    dataType: 'JSON',
    data: {
      post: {
        title:$('#post-title').val(),
        body: $('#post-body').val(),
      }
    },
    headers: { 'AUTHORIZATION': 'da4c93e08d5641fdb84d6abbbbb85d1f' },
  }).done(function(data){
    trace(data);
  }).fail(function(jqXHR, textStatus, errorThrown) {
    trace(jqXHR, textStatus, errorThrown);
  });
};


$(document).ready(function(){
  var $userForm = $('form#user-form');
  $userForm.on('submit', function(event){
    App.submitUser(event, $userForm);
  });

  var $postForm = $('form#new-post-form');
  $postForm.on('submit', function(event){
    App.submitPost(event);
  });


  trace("hello world")
});

// Peter Quill Token
// da4c93e08d5641fdb84d6abbbbb85d1f

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
  }
};

App.showUser = function(user){
  var html = '';
  html += '<h3>' + user.name + '</h3>';
  html += '<p>' + user.about + '</p>';
  html += '<p>' + user.email + '</p>';
  $('.users').append(html);
};

App.findUser = function(){
 $.ajax({
   url: 'http://localhost:3000/users',
   type: 'GET',
   dataType: 'JSON',
 })
 .done(function(data) {
   trace(data);
 })
 .fail(function() {
   trace("error");
 });
};

App.editUser = function(){
  $.ajax({
    url: 'http://localhost:3000/user/id',
    type: 'PATCH',
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
    success: function(data, textStatus,jqXHR){
      trace('I made a new User', data, textStatus,jqXHR);
    },
  }).done(function(data){
    trace(data);
  }).fail(function(jqXHR, textStatus, errorThrown){
    trace(jqXHR, textStatus, errorThrown);
  });
};

$(document).ready(function(){

  App.getAllUsers();


  var $userForm = $('form#user-form');
  $userForm.on('submit', function(event){
    App.submitUser(event, $userForm);
  });

  var $findUserForm = $('form#findUser-form');
  $findUserForm.on('submit', function(event) {
    App.findUser(event);
  });

  trace('Hello World');
});

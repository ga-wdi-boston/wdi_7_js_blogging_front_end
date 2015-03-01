'use strict';

var User = User || {};

User.showUsers = function(data){
  $.ajax({
    url: 'http://localhost:3000/users',
    type: 'GET',
    dataType: 'JSON',
  }).done(function(data){
    console.log(data);
    User.usersCallbackHandler(data);
  }).fail();
};


  User.usersHTML = function(user){
  $('#users').append('<ul>');
  $('ul').append('<li>' + user.first_name + '</li>' +
                 '<li>' + user.last_name + '</li>' +
                 '<li>' + user.role + '</li>' +
                 '<li>' + user.email + '</li>' +
                 '<li>' + user.posts + '</li>');

$('#users').append('</ul>');
};

User.usersCallbackHandler = function(users){
  for(var i = 0; i < users.length; i++){
    User.usersHTML(users[i]);
  }
};


$(document).ready(function(){
  User.showUsers();
});




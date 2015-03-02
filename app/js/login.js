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

  App.loginUser = function(event, form){
  if(event.preventDefault) event.preventDefault();
    $.ajax({
      url: 'http://localhost:3000/login',
      type: 'POST',
      dataType: 'JSON',
      data: {
        user: {
        username: $('#username').val(),
        password: $('#password').val()
    }
  },
  success: function(data, textStatus, jqXHR){
    trace('logged in!!!', data, textStatus, jqXHR);
    },
  }).done(function(data){
    trace(data);
  }).fail(function(jqXHR, textStatus, errorThrown){
    trace(jqXHR, textStatus, errorThrown);
  });
};

$('document').ready(function(){

  var $userForm = $('form#user-form');
  $userForm.on('submit', function(event){
    App.loginUser(event, $userForm);
  });
});
/*"109885dca2fc451fbca7d7795ff65355"*/

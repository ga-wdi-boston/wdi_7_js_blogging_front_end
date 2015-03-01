/*global $:false*/
'use strict';

var trace = function(){
  for(var i = 0; i < arguments.length; i++){
    console.log(arguments[i]);
  }
};

var App = App || {};

App.submitUser = function(event, form) {
    event.preventDefault();
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
        success: function(data, textStatus, jqXHR) {
            trace('I made a new user!!!!', data, textStatus, jqXHR);
        },
    }).done(function(data) {
        trace(data);//use this return info for posts
        // token: "5a678dab498949ce80ffa717efe70033"
    }).fail(function(jqXHR, textStatus, errorThrown) {
        trace(jqXHR, textStatus, errorThrown);
    });
};

App.getUsers = function() {
    $.ajax({
        url: 'http://localhost:3000/users',
        type: 'GET',
        dataType: 'json'
    })
    .done(function(data) {
        data.forEach(function(user) {
            $('ul#users').append('<li>' + user.first_name + '</li>');
        });
        console.table(data);
    });
};

$(document).ready(function() {
    $('form#user-form').on('submit', App.submitUser);

    App.getUsers();

  trace('hello world');
});

/*global $:false*/
'use strict';

var trace = function(){
  for(var i = 0; i < arguments.length; i++){
    console.log(arguments[i]);
  }
};

var App = App || {};

App.ajaxFail = function(jqXHR, textStatus, errorThrown) {
    trace(jqXHR, textStatus, errorThrown);
};

var postNewUser = {
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
    }
};

App.submitUser = function(event) {
    event.preventDefault();
    $.ajax(postNewUser).done(function(data, textStatus, jqXHR) {
        trace('I made a new user!!!!', data, textStatus, jqXHR);
        App.getUsers();
    }).fail(App.ajaxFail);
};

App.createUserHTML = function(user) {
    var userHTML =  '<li>' +
                        '<h3>username:<a href="http://localhost:9000/users/' + user.id + '.html" id="users/' + user.id + '">' + user.username + '</a></h3>' +
                        '<p>role: ' + user.role + ', posts: ' + user.posts.length + '</p>' +
                    '</li>';
    $('ul#users').append(userHTML);
};

App.renderUsers = function(users) {
    users.forEach(App.createUserHTML);
};

App.getUsers = function() {
    $.get('http://localhost:3000/users', App.renderUsers, 'json')
    .fail(App.ajaxFail);
};

$(document).ready(function() {
    $('form#user-form').on('submit', App.submitUser);
    App.getUsers();
    trace('hello world');
});

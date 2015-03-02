'use strict';

var App = App || {};

App.submitUser = function ( event, form ) {
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
    success: function ( data, textStatus, jqXHR ) {
      console.log(data, textStatus, jqXHR);
    },
  }).then(function(data) {
    console.log(data);
  }, function(jqXHR, textStatus, errorThrown) {
    console.log(jqXHR, textStatus, errorThrown);
  });
  return false;
};

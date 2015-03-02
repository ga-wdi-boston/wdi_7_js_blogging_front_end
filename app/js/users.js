'use strict';

$(document).ready(function() {
  $.ajax({
    url: 'http://localhost:3000/users',
    type: 'GET',
    dataType: 'JSON'
  })
  .done(function(users) {

    var $usersDiv = $('#users');
    //var $usersDiv = getElementById('users');
    for (var i = 0; i < users.length; i++) {
      console.log(users[i].username);

      $usersDiv = $('<div>');


      $usersDiv.text(users[i].username);


      $usersDiv.append($usersDiv);
    }
  });
});

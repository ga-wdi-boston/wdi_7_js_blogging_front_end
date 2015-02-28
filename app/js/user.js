var App = App || {};

App.Users = App.Users || {};

App.loggedIn;

App.Users.submitUser = function(event, form){
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
        password_confirmation: $('#passwordconfirmation').val(),
        role: $('#role').val(),
        first_name: $('#firstname').val(),
        last_name: $('#lastname').val()
      }
    },
    success: function(data, textStatus, jqXHR) {
      console.log('I made a new user!!!!!');
    },
  }).done(function(data){
    console.log(data);
  }).fail(function(jqXHR, textStatus, errorThrown){
    console.log(jqXHR, textStatus, errorThrown);
  });
};


App.Users.deleteUser = function(id){
  $.ajax({
    url: 'http://localhost:3000/users/' + id,
    type: 'DELETE',
    dataType: 'JSON',
  }).done(function(){
    console.log('fun times its gooone!');
  })
};

App.Users.getUsers = function(){
  $.ajax({
    url: 'http://localhost:3000/users',
    type: 'GET',
    dataType: 'JSON',
  }).done(function(data){
    console.log(data);
  })
};

App.Users.getUser = function(id ){
  $.ajax({
    url: 'http://localhost:3000/users/' + id,
    type: 'GET',
    dataType: 'JSON',
  }).done(function(data){
    console.log(data);
  })
};

App.Users.updateUser = function(id){
  $.ajax({
    url: 'http://localhost:3000/users/' + id,
    type: 'PATCH',
    dataType: 'JSON',
    data: {
      user: {
        username: 'bye',
        email: 'bye',
        password: 'bye',
        password_confirmation: 'bye',
        role: 'admin',
        first_name: 'bye',
        last_name: 'bye'
      }
    },
  }).done(function(data){
    console.log(data);
  })
};

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
        password_confirmation: $('#passwordconfirmation').val(),
        role: $('#role').val(),
        first_name: $('#firstname').val(),
        last_name: $('#lastname').val()
      }
    },
    success: function(data, textStatus, jqXHR){
      trace("I made a new user!", data, textStatus, jqXHR);
    }
  }).done(function(data){
    trace(data);
  }).fail(function(jqXHR, textStatus, errorThrown){
    trace(jqXHR, textStatus, errorThrown);
  });
};

App.submitPost = function(event){
  if(event.preventDefault) event.preventDefault();
  $.ajax({
    url: 'http://localhost:3000/posts',
    type: 'POST',
    dataType: 'JSON',
    data: {
      post: {
        title: $('#post-title').val(),
        categories: $('#post-category').val(),
        body: $('#post-body').val()
      }
    },
    headers: {'AUTHORIZATION': '3221d4ea9c7e4f50adb718001041d798'},
  }).done(function(data){
    App.add_categories(data);
    // data.categories.push($('#post-category').val());
    trace(data);

  }).fail(function(jqXHR, textStatus, errorThrown){
    trace(jqXHR, textStatus, errorThrown);
  });
};


App.get_all_posts = function() {
  if(event.preventDefault) event.preventDefault();
  $.ajax({
    url: 'http://localhost:3000/posts',
    type: 'GET',
    dataType: 'JSON',
  })
  .done(function(data) {
    App.render_all_posts(data);
    trace(data);
  });

  };

App.get_all_users = function() {
  if(event.preventDefault) event.preventDefault();
  $.ajax({
    url: 'http://localhost:3000/users',
    type: 'GET',
    dataType: 'JSON',
  })
  .done(function(data) {
    App.render_all_users(data);
  });
};

App.render_all_users = function(users){
  var html = "<h3>Users</h3>";
  html += "<ul>";
  users.forEach(function(user){
    html += "<p>";
    html += "<li>Name: " + user.first_name + " " + user.last_name + "</li>";
    html += "<li>Username: " + user.username + "</li>";
    html += "<li>Email: " + user.email + "</li>";
    html += "</p>";
  });
  html += "</ul>";
  $('.posts').append(html);

};

App.render_all_posts = function(posts){
   var html = '';

    posts.forEach(function(post){
      html += "<h2>" + post.title + "</h2>";
      html += "<article>" + post.body + "</article>";
      if (post.categories.length > 0){
        html += "<br><h3>Categories: </h3>";
        html += "<ul>";
        post.categories.forEach(function(category){
          html += "<li>" + category.name + "</li>";
        });
        html += "</ul>";
      };

    });
    $('.posts').append(html);
  };

App.add_categories = function(data){
    data.categories.push(data.categories);
    trace(data);
};

$(document).ready(function(){
  var $userForm = $('form#user-form');
  $userForm.on('submit', function(e){
    App.submitUser(event, $userForm);
  });

  var $postForm = $('form#new-post-form');
  $postForm.on('submit', function(event){
    App.submitPost(event);
  });

  App.get_all_posts();
  //App.get_all_users();
});

//Joe Smoe
//token: 3221d4ea9c7e4f50adb718001041d798

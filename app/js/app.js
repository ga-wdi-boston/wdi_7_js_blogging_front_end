/*global $:false*/
'use strict';

//optional for debugging
var trace = function(){
  for(var i = 0; i < arguments.length; i++){
    console.log(arguments[i]);
  }
};

var App = App || {};

App.submitPost = function(event){
  if(event.preventDefault) event.preventDefault();//here we are just asking if it exists
  $.ajax({
    url: 'http://localhost:3000/posts',
    type: 'POST',
    dataType: 'JSON',
    data: {
      post: {
        title: $('#post-title').val(),
        body: $('#post-body').val()
      }
    },
    headers: {'AUTHORIZATION': '408f15932a384c3e85e45a6c5bbd1136'},
    //headers is an object that takes a key value pair, all caps AUTHORIZATION. every post made will be by this user b/c we'll keep the token the same
  }).done(function(data){
    console.log('submitPost SUCCESSFUL');
    trace(data);
    App.confirm_post();
    App.getAllUsersPosts(data);
  }).fail(function(jqXHR, textStatus, errorThrown){
    trace(jqXHR, textStatus, errorThrown);
  });
  return false;
};

App.confirm_post = function(){
  $('#post-title').val('');
  $('#post-body').val('');
  $('#new_post_confirmation').html("Post created.");
  $('#new_post_confirmation').animate({backgroundColor: "#fbc7c7" }, 2000).animate({ opacity: "hide" }, 1500);
};

App.submitUser = function(event, form){
    if(event.preventDefault) event.preventDefault();//here we are just asking if it exists
    $.ajax({
      url: 'http://localhost:3000/users',
      type: 'POST',
      dataType: 'JSON',
      data:{
        user: {
          username: $('#username').val(),
          first_name: $('#firstname').val(),
          last_name: $('#lastname').val(),
          email: $('#email').val(),
          password: $('#password').val(),
          password_confirmation: $('#passwordconfirmation').val(),
          role: $('#role').val()
        }
      },
      success: function(data, textStatus,jqXHR){
        trace('I made a new User', data, textStatus,jqXHR);
      },
    }).done(function(data){
      trace(data);
      App.confirm_user();
    }).fail(function(jqXHR, textStatus, errorThrown){
      trace(jqXHR, textStatus, errorThrown);
    });
}; //end App.submitUser

App.confirm_user = function(){
  $('#username').val('');
  $('#firstname').val('');
  $('#lastname').val('');
  $('#email').val('');
  $('#password').val('');
  $('#passwordconfirmation').val('');
  $('#role').val('');
  $('#new_user_confirmation').html("User created.");
  $('#new_user_confirmation').animate({backgroundColor: "#fbc7c7" }, 2000).animate({ opacity: "hide" }, 1500);
};

App.getAllUsersPosts = function(){

$.ajax({
    url: 'http://localhost:3000/users',
    type: 'GET'
  }).done(function(users){
    console.log("app: GET success");
    console.log("number of users: " + users.length);
    console.log(users);
    App.displayAllUsersPosts(users);
// debugger;
  }).fail(function(jqXHR, textStatus, errorThrown){
    trace(jqXHR, textStatus, errorThrown);
  });
};//end App.getAllUsersPosts

App.displayAllUsersPosts = function(users){
  //sorter function, sort users in descending order
  function _sorter(a,b) {
    return (b.id) - (a.id);
  };
  var sorted_users = users.sort(_sorter);

  //Display only users who have posts
  var templateSource = $("#results_template").html();
  var template = Handlebars.compile(templateSource);
  var users_with_posts = [];
  sorted_users.forEach(function(user){
    if(user.posts.length >= 1){
      users_with_posts.push(user);
      console.log(user.username + " , " + user.posts.length);
      console.log(users_with_posts);
    }
  });
  //Display users with posts in the handlebars template:
  $(".posts").html(template(users_with_posts));

};//end App.displayAllUsersPosts

App.displayUserPosts = function(users){
  $('.posts').append('<p>');
  $('.posts').append('username: ' + users.username + '<br>');
  $('.posts').append('</p>');
};//end App.displayUserPosts


$(document).ready(function(){
  App.getAllUsersPosts();

  var $userForm = $('form#user-form');//use the form element with id of user-form
  $userForm.on('submit', function(event){
    App.submitUser(event, $userForm);
  });

  var $postForm = $('form#new-post-form');
  $postForm.on('submit', function(event){
    App.submitPost(event);
  });



  // trace('Hello World');
}); //end document ready

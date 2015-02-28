/*global $:false*/
'use strict';

var trace = function(){
  for(var i = 0; i < arguments.length; i++){
    console.log(arguments[i]);
  }
};

var App = App || {};

App.createCategory = function(event){
  if(event.preventDefault) event.preventDefault();
  $.ajax({
    url:"http://localhost:3000/categories",
    type: 'POST',
    dataType: 'JSON',
    data: {
      name: $('#category').val(),
    },
    headers: {'AUTHORIZATION': '4d4bcfb81b4247bdbd9649cc39c936d5'}
  }).done(function(data){
      trace(data);
  }).fail(function(jqXHR, textStatus, errorThrown){
      trace(jqXHR, textStatus, errorThrown);
  });
};


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
    success: function(data,textStatus,jqXHR){
      console.log('I made a user!!!!', data, textStatus, jqXHR);
    },
  }).done(function(data){
    trace(data);
  }).fail(function(jqXHR, textStatus, errorThrown){
    trace(jqXHR, textStatus, errorThrown);
  });
};

App.submitPost = function(event){
  if(event.preventDefault) event.preventDefault();
  $.ajax({
    url:"http://localhost:3000/posts",
    type: 'POST',
    dataType: 'JSON',
    data: {
      post: {
        title: $('#post-title').val(),
        body: $('#post-body').val()
      }
    },
    headers: {'AUTHORIZATION': '4d4bcfb81b4247bdbd9649cc39c936d5'}
  }).done(function(data){
      trace(data);
      App.showAllPosts();
  }).fail(function(jqXHR, textStatus, errorThrown){
      trace(jqXHR, textStatus, errorThrown);
  });
};

App.getPosts = function(){
  $.ajax({
    url: 'http://localhost:3000/posts',
    type: 'GET',
    dataType: 'JSON'
  })
  .done(function(results) {
    App.showAllPosts(results);
  });
};

App.showAllPosts = function(results){
  for (var i = 0; i < results.length; i++){
    $('.posts').append('<article>' + results[i].title + '<br>' + results[i].body + '</article>');
    $('.posts').append('<br>');
  }
};

App.showOnePost = function(results){
  $('.posts').append('<article>' + results[0].title + '<br>' + results[0].body + '</article>');
};

App.getCategories = function(results){
  $.ajax({
    url: 'http://localhost:3000/categories',
    type: 'GET',
    dataType: 'JSON'
  })
  .done(function(results) {
    for (var i = 0; i < results.length; i++){
      $('#category').append('<option value="' + results[i].name + '">' + results[i].name + '</option');
    }
  });
};

// <select id="category" name="category">
// <option value="">Select Category</option>
// </select>

App.init = function() {
  App.getCategories();

  App.getPosts();

  var $userForm = $('form#user-form');
  $userForm.on('submit', function(event){
    App.submitUser(event,$userForm);
  });

  var $postForm = $('form#new-post-form');
  $postForm.on('submit',function(event){
    App.submitPost(event);
  });

};

$(document).ready(function(){
  App.init();
  trace('hello world');
});



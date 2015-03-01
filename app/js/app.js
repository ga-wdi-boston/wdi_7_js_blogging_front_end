/*global $:false*/
'use strict';

var App = App || {};

App.Post = function(remotePost){
  this.title = remotePost.title;
  this.body = remotePost.body;
};

App.Post.prototype.render = function(){
  var html = "<h2>" + this.title + "</h2>";
  html += "<p>" + this.body + "</p>";
  return html;
};

App.postHandler = function(remotePosts){
  var html = "<ul>", post;

  remotePosts.forEach(function(remotePost){
    post = new App.Post(remotePost);
    html += post.render();
  })

  html += "</ul>";
  $('.posts').append(html);
};

// POST requests-----------------------------------------------------

App.submitPost = function(){
  if(event.preventDefault) event.preventDefault();
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
    headers: { 'AUTHORIZATION': '6e9bd12942634ffd8463a6e3e8647a30' },
  }).done(function(data){
    console.log(data);
  }).fail(function(jqXHR, textStatus, errorThrown){
    console.log(jqXHR, textStatus, errorThrown);
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
        email: $("#email").val(),
        password: $('#password').val(),
        password_confirmation: $('#passwordconfirmation').val(),
        role: $('#role').val(),
        first_name: $('#firstname').val(),
        last_name: $('#lastname').val()
      }
    },
    success: function(data, textStatus, jqXHR){
      console.log('I made a user', data, textStatus, jqXHR);
    },
  }).done(function(data){
    console.log(data);
  }).fail(function(jqXHR, textStatus, errroThrown){
    console.log(jqXHR, textStatus, errroThrown);
  });
};

App.submitCategory = function(){
 if(event.preventDefault) event.preventDefault();
 $.ajax({
    url: 'http://localhost:3000/categories',
    type: 'POST',
    dataType: 'JSON',
    data: {
      category: {
        name: $('#catname').val()
      }
    },
    success: function(data, textStatus, jqXHR){
      console.log('I made a category', data, textStatus, jqXHR);
    },
  }).done(function(data){
    console.log(data);
  }).fail(function(jqXHR, textStatus, errroThrown){
    console.log(jqXHR, textStatus, errroThrown);
  });
};

// GET requests------------------------------------------------------

App.getPost = function(){
  $.ajax({
    url: 'http://localhost:3000/posts',
    type: 'GET',
    dataType: 'JSON'
  }).done(function(data){
    console.log(data);
    App.postHandler(data);
  });
};

App.getCategory = function(){
  $.ajax({
    url: 'http://localhost:3000/categories',
    type: 'GET',
    dataType: 'JSON'
  }).done(function(data){
    console.log(data);
  });
};

App.getUser = function(){
  $.ajax({
    url: 'http://localhost:3000/users',
    type: 'GET',
    dataType: 'JSON'
  }).done(function(data){
    console.log(data);
  });
};

// Doc ready-----------------------------------------------------------

$(document).ready(function(){
  var $userForm = $('form#user-form');
  $userForm.on('submit', function(e){
    App.submitUser(e,$userForm);
  });
  var $postForm = $('form#new-post-form');
  $postForm.on('submit', function(event){
    App.submitPost(event);
  });
  var $categoryForm = $('form#category-form')
  $categoryForm.on('submit', function(event){
    App.submitCategory(event);
  });

  App.getPost();
  App.getCategory();
  App.getUser();

});

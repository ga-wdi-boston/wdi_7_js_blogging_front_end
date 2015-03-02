/*global $:false*/
'use strict';

var App = App || {};

var trace = function(){
  for(var i = 0; i < arguments.length; i++){
    console.log(arguments[i]);
  }
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
        body: $('#post-body').val(),
        },
    },
    headers: {'AUTHORIZATION': 'b254f0ae13c04cff89f80092b9664908'},
  }).done(function(data){
    trace(data);
  }).fail(function(jqXHR, textStatus, errorThrown){
    trace(jqXHR, textStatus, errorThrown);
  });
  return false;
};

App.getAllPosts = function(){
  $.ajax({
    url: 'http://localhost:3000/posts',
    type: 'GET',
    dataType: 'JSON'
  })
  .done(function(data) {
    trace(data);
    App.listAllPosts(data);
  })
  .fail(function(jqXHR, textStatus, errorThrown){
    trace(jqXHR, textStatus, errorThrown);
  });
};

App.listAllPosts = function(posts){
  for (var i = 0; i < 5; i++) {
    App.showPost(posts[i]);
  }
};

App.showPost = function(post){
  var html = '';
  html += '<div>';
  html += '<h3>' + post.title + '</h3>';
  html += '<p>' + post.body + '</p>';
  html += '</div>';
  // html += '<button name="button" class="delete-post" id="' + post.id + '">Delete Post</button>';
  $('.posts').append(html);
};

App.deletePost = function(event){
  event.preventDefault;
  $.ajax({
    url: 'http://localhost:3000/posts/' + post.id,
    type: 'DELETE',
    dataType: 'JSON',
  })
  .done(function(data) {
    trace(data);
  })
  .fail(function() {
    console.log("error");
  });
};

App.submitCategory = function(event){
  event.preventDefault();
 $.ajax({
    url: 'http://localhost:3000/categories',
    type: 'POST',
    dataType: 'json',
    data: {
      category: {
        name: $('#category-name').val(),
      }
    }
  })
  .done(function() {
    console.log("success");
  })
  .fail(function() {
    console.log("error");
  });
};

App.getAllCategories = function(){
  $.ajax({
    url: 'http://localhost:3000/categories',
    type: 'GET',
    dataType: 'JSON',
  })
  .done(function(data) {
    console.log("success");
    App.listAllCategories(data);
  })
  .fail(function() {
    console.log("error");
  });
};

App.listAllCategories = function(categories){
  for (var i = 0; i < categories.length; i++) {
    App.showCategory(categories[i]);
  }
};

App.showCategory = function(category){
  var html = '';
  html += '<p>' + category.name + '</p>';
  $('.categories').append(html);
};


$(document).ready(function(){


  App.getAllPosts();

  // App.getAllUsers();


  var $userForm = $('form#user-form');
  $userForm.on('submit', function(event){
    App.submitUser(event, $userForm);
  });
  var $postForm = $('form#new-post-form');
  $postForm.on('submit',function(event){
    App.submitPost(event);
  });

  var $categoryForm = $('form#new-category-form');
  $categoryForm.on('submit', function(event){
    App.submitCategory(event);
  });

  var $findUserForm = $('form#findUser-form');
  $findUserForm.on('submit', function(event) {
    App.findUser(event);
  });

  var $deletePostForm = $("button");
  $deletePostForm.on("click", function(event) {
    trace('Hello Deletion ');
    // App.deletePost(event);
  });

  // $('form#new-post-form').on('submit', App.getAllPosts);

  trace('Hello World');
});

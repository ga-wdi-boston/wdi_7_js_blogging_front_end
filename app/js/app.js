/*global $:false*/
'use strict';

var trace = function(){
  for(var i = 0; i < arguments.length; i++){
    console.log(arguments[i]);
  }
};

var BlogApp = BlogApp || {};

$(document).ready(function(){
  BlogApp.showPosts();
  BlogApp.showCategories();

  var $userForm = $('form#user-form');
  $userForm.on('submit', function(e) {
    BlogApp.submitUser(e, $userForm);
  });

  var $postForm = $('form#new-post-form');
  $postForm.on('submit', function(event) {
    BlogApp.submitPost(event);
    $('#post-title').val('');
    $('#post-body').val('');
  });

  var $categoryForm = $('form#new-category-form');
  $categoryForm.on('submit', function(event) {
    BlogApp.submitCategory(event);
    $('#category-name').val('');
  });

  // var deleteCategoryButton = $('#category')
  //   $('#category-)
});

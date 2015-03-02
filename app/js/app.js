/*global $:false*/
'use strict';

var trace = function(){
  for(var i = 0; i < arguments.length; i++){
    console.log(arguments[i]);
  }
};

var App = App || {
  $posts: $('.posts'),
  $categories: $('#post-categories'),
  $categoryButtons: $('#category-buttons')
}

$(document).ready(function(){

  App.Posts.viewAllPosts();
  App.Category.viewAllCategories();

  var $userForm = $('form#user-form');
  $userForm.on('submit',function(e){
    App.Users.submitUser(e, $userForm);
  });

  var $postForm = $('form#new-post-form');
  $postForm.on('submit', function(event){
    App.Posts.submitPost(event);
  });

  var $newCategory = $('#new-category');
  $newCategory.on('click', function(){
    App.submitCategory();
  });
});

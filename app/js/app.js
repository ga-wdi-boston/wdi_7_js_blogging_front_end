/*global $:false*/
'use strict';

var trace = function(){
  for(var i = 0; i < arguments.length; i++){
    console.log(arguments[i]);
  }
};


$(document).ready(function(){

  App.Posts.viewAllPosts();

  var $userForm = $('form#user-form');
  $userForm.on('submit',function(e){
    App.Users.submitUser(e, $userForm);
  });

  var $postForm = $('form#new-post-form');
  $postForm.on('submit', function(event){
    App.Posts.submitPost(event);
  });
});

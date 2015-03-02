/*global $:false*/
'use strict';

var App = App || {};

var trace = function(){
  for(var i = 0; i < arguments.length; i++){
    console.log(arguments[i]);
  }
};

$(document).ready(function() {
  var $userForm = $('form#user-form');
  $userForm.on('submit', function(event) {
    App.submitUser(event, $userForm);
  });

  var $postForm = $('form#new-post-form');
  $postForm.on('submit', function(event){
    App.submitPost(event);
  });

  App.PostList.get();


  trace('trace');
});
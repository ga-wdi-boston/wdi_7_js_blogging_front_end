/*global $:false*/
'use strict';
$(document).ready(function() {
  var $userForm = $('form#user-form');
  $userForm.on('submit', function(event) {
    App.submitUser(event, $userForm);
  });

  var $postForm = $('form#new-post-form');
  $postForm.on('submit', function(event){
    App.submitPost(event);
  });


  trace("trace");
});

var trace = function(){
  for(var i = 0; i < arguments.length; i++){
    console.log(arguments[i]);
  }
};

var App = App || {};





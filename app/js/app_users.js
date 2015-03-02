/*global $:false*/
'use strict';

//optional for debugging
var trace = function(){
  for(var i = 0; i < arguments.length; i++){
    console.log(arguments[i]);
  }
};

var App = App || {};

App.get_all_users_posts = function(users){
  //Display all users
  var templateSource = $("#users_results_template").html();
  var template = Handlebars.compile(templateSource);

  //Display users with posts in the handlebars template:
  $(".users").html(template(users));
};//end App.get_all_users_posts

App.delete_user = function(){

}

$(document).ready(function(){
  $.ajax({
    url: 'http://localhost:3000/users',
    type: 'GET'
  }).done(function(users){
    console.log("app users - GET success");
    console.log("number of users: " + users.length);
    console.log(users);
// debugger;
    App.get_all_users_posts(users);
  }).fail(function(jqXHR, textStatus, errorThrown){
    trace(jqXHR, textStatus, errorThrown);
  });

  var $deleteUser = $('.del_user_glyph');
  $deleteUser.on('click', function(event){
    event.preventDefault();
    console.log("CLICKED!!");
    // App.delete_user(event);
  });

  // trace('Hello World');
}); //end document ready

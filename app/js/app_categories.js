/*global $:false*/
'use strict';

//optional for debugging
var trace = function(){
  for(var i = 0; i < arguments.length; i++){
    console.log(arguments[i]);
  }
};

var App = App || {};

App.get_all_categories_posts = function(categories){
  //Display all categories
  var templateSource = $("#categories_results_template").html();
  var template = Handlebars.compile(templateSource);

  //Display categories with posts in the handlebars template:
  $(".categories").html(template(categories));
};//end App.get_all_categories_posts

App.delete_user = function(){

}

$(document).ready(function(){
  $.ajax({
    url: 'http://localhost:3000/categories',
    type: 'GET'
  }).done(function(categories){
    console.log("app categories - GET success");
    console.log("number of categories: " + categories.length);
    console.log(categories);
// debugger;
    App.get_all_categories_posts(categories);
  }).fail(function(jqXHR, textStatus, errorThrown){
    trace(jqXHR, textStatus, errorThrown);
  });

  var $deleteCategory = $('.del_category_glyph');
  $deleteCategory.on('click', function(event){
    event.preventDefault();
    console.log("CLICKED!!");
    // App.delete_user(event);
  });

  // trace('Hello World');
}); //end document ready

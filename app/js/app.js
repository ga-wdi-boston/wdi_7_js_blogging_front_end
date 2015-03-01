/*global $:false*/
'use strict';

var trace = function(){
  for(var i = 0; i < arguments.length; i++){
    console.log(arguments[i]);
  }
};

var display = function(data){
  var post = '';
  var postCategories = '';
  for(var i = 0; i < data.length; i++){
    post += '<div id=' + i + '><p><b>' + data[i].title + '</b></p>' + '<p>' + data[i].body + '</p></div>';
    if(data[i].categories.length != 0){
      for (var categoryIndex = 0; categoryIndex < data[i].categories; categoryIndex++){
        postCategories += '<footer>' + data[i].categories[categoryIndex].id + " " + data[i].categories[categoryIndex].name + " " + data[i].categories[categoryIndex].created_at + " " + data[i].categories[categoryIndex].updated_at + '</footer>';
    }
      $('#posts').html(post);
      $('#posts').html(postCategories);
    } else {
      $('#posts').html(post);
    };
  };
};

var App = App || {};

$(document).ready(function(){
  trace('hello world');
});

App.displayPosts = function(event){
  // if(event.preventDefault) event.preventDefault();
  $.ajax({
    url: 'http://localhost:3000/posts',
    type: 'GET'
    }).done(function(data){
      trace(data);
      display(data);
    }).fail(function(jqXHR, textStatus, errorThrown){
    });
    return false
  };

$('document').ready(function(){
    App.displayPosts(event);
});
/*"109885dca2fc451fbca7d7795ff65355"*/

/*global $:false*/
'use strict';

var trace = function(){
  for(var i = 0; i < arguments.length; i++){
    console.log(arguments[i]);
  }
};

var display = function(data){
  var string = '';
  for(var i = 0; i < data.length; i++){
    string += '<p>' + data[i].title + '</p>' + '<p>' + data[i].body + '</p>';
    $('#posts').html(string);
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
